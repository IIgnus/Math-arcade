export function createScratchpad({ $ }) {
  const canvas = $('scratch-canvas');
  const context = canvas.getContext('2d');
  let drawing = false;
  let strokes = [];
  let currentStroke = [];

  context.lineCap = 'round';
  context.lineJoin = 'round';

  function canvasPoint(event) {
    const rectangle = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rectangle.left) * (canvas.width / rectangle.width),
      y: (event.clientY - rectangle.top) * (canvas.height / rectangle.height)
    };
  }

  function redraw() {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#17202a';
    context.lineWidth = Number($('pen-size').value);

    for (const stroke of strokes) {
      if (stroke.length < 2) continue;
      context.beginPath();
      context.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach(point => context.lineTo(point.x, point.y));
      context.stroke();
    }
  }

  canvas.onpointerdown = event => {
    drawing = true;
    currentStroke = [canvasPoint(event)];
    canvas.setPointerCapture(event.pointerId);
  };

  canvas.onpointermove = event => {
    if (!drawing) return;
    currentStroke.push(canvasPoint(event));
    strokes.push(currentStroke);
    redraw();
    strokes.pop();
  };

  canvas.onpointerup = canvas.onpointercancel = () => {
    if (!drawing) return;
    drawing = false;
    if (currentStroke.length) strokes.push(currentStroke);
    currentStroke = [];
    redraw();
  };

  $('scratch-btn').onclick = () => {
    $('scratch-box').classList.toggle('hidden');
    redraw();
  };

  $('undo-draw-btn').onclick = () => {
    strokes.pop();
    redraw();
  };

  $('clear-draw-btn').onclick = () => {
    strokes = [];
    redraw();
  };

  $('pen-size').oninput = redraw;
  $('clear-notes-btn').onclick = () => { $('typed-notes').value = ''; };

  document.querySelectorAll('.symbol-btn').forEach(button => {
    button.onclick = () => {
      const textArea = $('typed-notes');
      const start = textArea.selectionStart;
      textArea.value = textArea.value.slice(0, start) + button.textContent + textArea.value.slice(textArea.selectionEnd);
      textArea.focus();
      textArea.selectionStart = textArea.selectionEnd = start + button.textContent.length;
    };
  });

  document.querySelectorAll('[data-scratch]').forEach(button => {
    button.onclick = () => {
      document.querySelectorAll('[data-scratch]').forEach(tab => {
        tab.classList.toggle('active', tab === button);
      });
      $('draw-pane').classList.toggle('active', button.dataset.scratch === 'draw');
      $('type-pane').classList.toggle('active', button.dataset.scratch === 'type');
    };
  });

  function reset() {
    strokes = [];
    currentStroke = [];
    $('typed-notes').value = '';
    redraw();
  }

  redraw();
  return { reset, redraw };
}
