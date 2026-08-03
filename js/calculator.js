export function createCalculator({ $, getUnlocks, toast }) {
  const ranks = { none: 0, basic: 1, scientific: 2, graphing: 3 };
  const basicKeys = ['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','(',')','C','⌫','=','+'];
  const scientificKeys = ['sin(','cos(','tan(','√(','log(','ln(','π','e','7','8','9','÷','4','5','6','×','1','2','3','−','0','.','^','+','(',')','C','⌫','='];

  function modeRank(mode) {
    return ranks[mode] || 0;
  }

  function allowedMode(question) {
    const requested = question.calculatorMode || (question.calculatorAllowed ? 'basic' : 'none');
    const unlocked = getUnlocks();
    if (requested === 'graphing' && unlocked.graphing) return 'graphing';
    if (modeRank(requested) >= 2 && unlocked.scientific) return 'scientific';
    return question.calculatorAllowed || requested === 'basic' ? 'basic' : 'none';
  }

  function normaliseExpression(expression) {
    return expression
      .replaceAll('×', '*')
      .replaceAll('÷', '/')
      .replaceAll('−', '-')
      .replaceAll('π', 'PI')
      .replaceAll('^', '**')
      .replace(/\b√\(/g, 'sqrt(')
      .replace(/\bln\(/g, 'ln(');
  }

  function evaluate(expression, xValue = 0) {
    const normalised = normaliseExpression(expression);
    if (!/^[0-9x+\-*/().,\sA-Za-z_*]+$/.test(normalised)) throw new Error('Invalid characters');
    const allowedNames = ['sin','cos','tan','sqrt','log','ln','PI','E','x'];
    const words = normalised.match(/[A-Za-z_]+/g) || [];
    if (words.some(word => !allowedNames.includes(word))) throw new Error('Unsupported function');

    const evaluator = Function(
      'x','sin','cos','tan','sqrt','log','ln','PI','E',
      `"use strict"; return (${normalised});`
    );

    return evaluator(xValue, Math.sin, Math.cos, Math.tan, Math.sqrt, Math.log10, Math.log, Math.PI, Math.E);
  }

  function press(key, displayId) {
    const display = $(displayId);
    if (key === 'C') return void (display.value = '');
    if (key === '⌫') return void (display.value = display.value.slice(0, -1));
    if (key === '=') {
      try {
        const value = evaluate(display.value);
        display.value = Number.isFinite(value) ? String(Number(value.toPrecision(12))) : 'Error';
      } catch {
        display.value = 'Error';
      }
      return;
    }
    display.value += key;
  }

  function buildGrid(containerId, keys, displayId) {
    const container = $(containerId);
    container.innerHTML = '';
    keys.forEach(key => {
      const button = document.createElement('button');
      button.className = 'btn secondary';
      button.textContent = key;
      button.onclick = () => press(key, displayId);
      container.appendChild(button);
    });
  }

  function switchMode(mode) {
    document.querySelectorAll('[data-calc-mode]').forEach(button => {
      button.classList.toggle('active', button.dataset.calcMode === mode);
    });
    document.querySelectorAll('.calculator-pane').forEach(pane => pane.classList.remove('active'));
    $(`${mode}-calc-pane`).classList.add('active');
  }

  function configureForQuestion(question) {
    const mode = allowedMode(question);
    const unlocks = getUnlocks();

    document.querySelectorAll('[data-calc-mode]').forEach(button => {
      const buttonMode = button.dataset.calcMode;
      const unlocked = buttonMode === 'basic' || (buttonMode === 'scientific' && unlocks.scientific) || (buttonMode === 'graphing' && unlocks.graphing);
      const permitted = modeRank(buttonMode) <= modeRank(mode);
      button.disabled = !unlocked || !permitted;
      button.textContent = buttonMode === 'basic' ? 'Basic' : buttonMode === 'scientific' ? `Scientific ${unlocked ? '' : '🔒'}` : `Graphing ${unlocked ? '' : '🔒'}`;
    });

    switchMode(mode === 'none' ? 'basic' : mode);
    $('calculator-title').textContent = mode === 'graphing' ? 'Graphing calculator' : mode === 'scientific' ? 'Scientific calculator' : 'Basic calculator';
    $('calculator-unlock-note').textContent = mode === 'graphing' ? 'Graphing mode allowed' : mode === 'scientific' ? 'Scientific mode allowed' : 'Basic mode allowed';
  }

  function drawGraph() {
    const expression = $('graph-expression').value.trim();
    const canvas = $('graph-canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const xMin = -10, xMax = 10, yMin = -10, yMax = 10;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = '#d7dde5';
    context.lineWidth = 1;

    for (let i = -10; i <= 10; i++) {
      const px = (i - xMin) / (xMax - xMin) * width;
      const py = height - (i - yMin) / (yMax - yMin) * height;
      context.beginPath(); context.moveTo(px, 0); context.lineTo(px, height); context.stroke();
      context.beginPath(); context.moveTo(0, py); context.lineTo(width, py); context.stroke();
    }

    context.strokeStyle = '#17202a';
    context.lineWidth = 2;
    const xAxis = height - (0 - yMin) / (yMax - yMin) * height;
    const yAxis = (0 - xMin) / (xMax - xMin) * width;
    context.beginPath(); context.moveTo(0, xAxis); context.lineTo(width, xAxis); context.stroke();
    context.beginPath(); context.moveTo(yAxis, 0); context.lineTo(yAxis, height); context.stroke();

    context.strokeStyle = '#58cc02';
    context.lineWidth = 3;
    context.beginPath();
    let drawingSegment = false;

    try {
      for (let px = 0; px < width; px++) {
        const x = xMin + px / width * (xMax - xMin);
        const y = evaluate(expression, x);
        const py = height - (y - yMin) / (yMax - yMin) * height;
        if (!Number.isFinite(y) || py < -height || py > height * 2) {
          drawingSegment = false;
          continue;
        }
        if (!drawingSegment) {
          context.moveTo(px, py);
          drawingSegment = true;
        } else {
          context.lineTo(px, py);
        }
      }
      context.stroke();
    } catch {
      toast('That graph expression could not be understood.');
    }
  }

  buildGrid('calc-grid', basicKeys, 'calc-display');
  buildGrid('scientific-grid', scientificKeys, 'scientific-display');

  document.querySelectorAll('[data-calc-mode]').forEach(button => {
    button.onclick = () => {
      if (!button.disabled) switchMode(button.dataset.calcMode);
    };
  });

  $('calculator-btn').onclick = () => $('calculator-box').classList.toggle('hidden');
  $('draw-graph-btn').onclick = drawGraph;

  return { allowedMode, configureForQuestion, getUnlocks };
}
