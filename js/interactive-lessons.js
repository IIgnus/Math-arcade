const SVG_NS = 'http://www.w3.org/2000/svg';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function escapeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
}

function createSection(container, config) {
  const section = document.createElement('section');
  section.className = 'interactive-lesson';
  section.dataset.interactiveType = config.type || 'unknown';
  section.innerHTML = `
    <div class="interactive-lesson-head">
      <div>
        <p class="eyebrow">TRY IT YOURSELF</p>
        <h3>${escapeText(config.title || 'Interactive example')}</h3>
        ${config.instructions ? `<p class="muted interactive-instructions">${escapeText(config.instructions)}</p>` : ''}
      </div>
      <span class="badge">Interactive</span>
    </div>
  `;
  container.appendChild(section);
  return section;
}

function makeRange({ label, min, max, value, step = 1 }) {
  const wrapper = document.createElement('label');
  wrapper.className = 'interactive-control';
  wrapper.innerHTML = `
    <span>${escapeText(label)}</span>
    <div class="interactive-control-row">
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${escapeText(label)}">
      <output>${value}</output>
    </div>
  `;
  const input = wrapper.querySelector('input');
  const output = wrapper.querySelector('output');
  input.addEventListener('input', () => { output.value = input.value; });
  return { wrapper, input, output };
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function renderQuantityBars(container, config) {
  const min = Number(config.min ?? 0);
  const max = Math.max(min + 1, Number(config.max ?? 10));
  const labels = Array.isArray(config.labels) ? config.labels : ['Value A', 'Value B'];
  const values = (Array.isArray(config.values) ? config.values : [3, 4]).map(value => clamp(value, min, max));
  const section = createSection(container, config);
  const bars = document.createElement('div');
  bars.className = 'interactive-bars';
  const total = document.createElement('div');
  total.className = 'interactive-result';
  total.setAttribute('aria-live', 'polite');

  const update = () => {
    bars.querySelectorAll('[data-bar-fill]').forEach((fill, index) => {
      fill.style.width = `${((values[index] - min) / (max - min)) * 100}%`;
    });
    total.textContent = `${values.join(' + ')} = ${values.reduce((sum, value) => sum + value, 0)}`;
  };

  values.forEach((value, index) => {
    const control = makeRange({ label: labels[index] || `Value ${index + 1}`, min, max, value });
    control.wrapper.insertAdjacentHTML('beforeend', '<div class="interactive-bar-track"><div class="interactive-bar-fill" data-bar-fill></div></div>');
    control.input.addEventListener('input', () => { values[index] = Number(control.input.value); update(); });
    bars.appendChild(control.wrapper);
  });
  section.append(bars, total);
  update();
}

function renderNumberLine(container, config) {
  const min = Number(config.min ?? 0);
  const max = Math.max(min + 1, Number(config.max ?? 10));
  const start = clamp(config.start ?? min, min, max);
  const step = clamp(config.step ?? 1, -(max - min), max - min);
  const section = createSection(container, config);
  const control = makeRange({ label: 'Jump size', min: -(max - min), max: max - min, value: step });
  const result = document.createElement('div');
  result.className = 'interactive-result';
  result.setAttribute('aria-live', 'polite');
  const line = document.createElement('div');
  line.className = 'interactive-number-line';
  const jump = document.createElement('div');
  jump.className = 'interactive-number-jump';
  const marker = document.createElement('div');
  marker.className = 'interactive-number-marker';
  marker.textContent = '●';
  line.append(jump, marker);

  const tickStep = max - min > 20 ? 2 : 1;
  for (let value = min; value <= max; value += tickStep) {
    const tick = document.createElement('span');
    tick.className = 'interactive-number-line-tick';
    tick.style.left = `${((value - min) / (max - min)) * 100}%`;
    tick.textContent = value;
    line.appendChild(tick);
  }

  const update = () => {
    const amount = Number(control.input.value);
    const end = clamp(start + amount, min, max);
    const a = ((start - min) / (max - min)) * 100;
    const b = ((end - min) / (max - min)) * 100;
    marker.style.left = `${b}%`;
    jump.style.left = `${Math.min(a, b)}%`;
    jump.style.width = `${Math.abs(b - a)}%`;
    result.textContent = `${start} ${amount >= 0 ? '+' : '−'} ${Math.abs(amount)} = ${end}`;
  };
  control.input.addEventListener('input', update);
  section.append(control.wrapper, line, result);
  update();
}

function renderPlaceValue(container, config) {
  const max = Math.max(99, Number(config.max ?? 9999));
  const section = createSection(container, config);
  const control = makeRange({ label: 'Number', min: 0, max, value: clamp(config.value ?? 347, 0, max) });
  const display = document.createElement('div');
  display.className = 'place-value-grid';
  const result = document.createElement('div');
  result.className = 'interactive-result';

  const update = () => {
    const number = Math.round(Number(control.input.value));
    const digits = String(number).padStart(4, '0').slice(-4).split('').map(Number);
    const names = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
    display.innerHTML = digits.map((digit, index) => `
      <div class="place-value-column">
        <strong>${names[index]}</strong>
        <span class="place-value-digit">${digit}</span>
        <div class="place-value-blocks" aria-hidden="true">${'<i></i>'.repeat(Math.min(digit, 9))}</div>
      </div>
    `).join('');
    const parts = digits.map((digit, index) => digit * [1000, 100, 10, 1][index]).filter(Boolean);
    result.textContent = parts.length ? `${number} = ${parts.join(' + ')}` : '0 = 0';
  };
  control.input.addEventListener('input', update);
  section.append(control.wrapper, display, result);
  update();
}

function renderFractionBars(container, config) {
  const section = createSection(container, config);
  const initial = Array.isArray(config.fractions) && config.fractions.length ? config.fractions : [[1, 2], [3, 4]];
  const state = initial.slice(0, 3).map(([n, d]) => ({ numerator: clamp(n, 0, d || 1), denominator: clamp(d || 1, 1, 12) }));
  const controls = document.createElement('div');
  controls.className = 'fraction-controls';
  const visual = document.createElement('div');
  visual.className = 'fraction-bars';
  const result = document.createElement('div');
  result.className = 'interactive-result';

  state.forEach((fraction, index) => {
    const group = document.createElement('div');
    group.className = 'fraction-control-group';
    const denominator = makeRange({ label: `Bar ${index + 1} denominator`, min: 1, max: 12, value: fraction.denominator });
    const numerator = makeRange({ label: `Bar ${index + 1} numerator`, min: 0, max: fraction.denominator, value: fraction.numerator });
    denominator.input.addEventListener('input', () => {
      fraction.denominator = Number(denominator.input.value);
      numerator.input.max = fraction.denominator;
      fraction.numerator = Math.min(fraction.numerator, fraction.denominator);
      numerator.input.value = fraction.numerator;
      numerator.output.value = fraction.numerator;
      update();
    });
    numerator.input.addEventListener('input', () => { fraction.numerator = Number(numerator.input.value); update(); });
    group.append(denominator.wrapper, numerator.wrapper);
    controls.appendChild(group);
  });

  function update() {
    visual.innerHTML = state.map((fraction, index) => `
      <div class="fraction-bar-row">
        <strong>${fraction.numerator}/${fraction.denominator}</strong>
        <div class="fraction-bar" style="grid-template-columns:repeat(${fraction.denominator},1fr)">
          ${Array.from({ length: fraction.denominator }, (_, i) => `<span class="${i < fraction.numerator ? 'filled' : ''}"></span>`).join('')}
        </div>
      </div>
    `).join('');
    if (state.length >= 2) {
      const [a, b] = state;
      const av = a.numerator / a.denominator;
      const bv = b.numerator / b.denominator;
      result.textContent = `${a.numerator}/${a.denominator} ${av === bv ? '=' : av > bv ? '>' : '<'} ${b.numerator}/${b.denominator}`;
    }
  }
  section.append(controls, visual, result);
  update();
}

function renderBalanceScale(container, config) {
  const section = createSection(container, config);
  const left = makeRange({ label: config.leftLabel || 'Left side', min: 0, max: 20, value: clamp(config.left ?? 6, 0, 20) });
  const right = makeRange({ label: config.rightLabel || 'Right side', min: 0, max: 20, value: clamp(config.right ?? 6, 0, 20) });
  const scale = document.createElement('div');
  scale.className = 'balance-scale';
  scale.innerHTML = `
    <div class="balance-beam"><div class="balance-pan left-pan"></div><div class="balance-pan right-pan"></div></div>
    <div class="balance-pivot">▲</div>
  `;
  const result = document.createElement('div');
  result.className = 'interactive-result';
  const update = () => {
    const l = Number(left.input.value); const r = Number(right.input.value);
    const angle = clamp((r - l) * 2.5, -18, 18);
    scale.querySelector('.balance-beam').style.transform = `rotate(${angle}deg)`;
    scale.querySelector('.left-pan').textContent = l;
    scale.querySelector('.right-pan').textContent = r;
    result.textContent = l === r ? `${l} = ${r} — balanced` : `${l} ${l > r ? '>' : '<'} ${r}`;
  };
  left.input.addEventListener('input', update); right.input.addEventListener('input', update);
  section.append(left.wrapper, right.wrapper, scale, result);
  update();
}

function renderAreaModel(container, config) {
  const section = createSection(container, config);
  const width = makeRange({ label: config.widthLabel || 'Width', min: 1, max: 12, value: clamp(config.width ?? 4, 1, 12) });
  const height = makeRange({ label: config.heightLabel || 'Height', min: 1, max: 12, value: clamp(config.height ?? 3, 1, 12) });
  const grid = document.createElement('div');
  grid.className = 'area-model-grid';
  const result = document.createElement('div');
  result.className = 'interactive-result';
  const update = () => {
    const w = Number(width.input.value); const h = Number(height.input.value);
    grid.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
    grid.innerHTML = '<span></span>'.repeat(w * h);
    result.textContent = `${w} × ${h} = ${w * h} square units`;
  };
  width.input.addEventListener('input', update); height.input.addEventListener('input', update);
  section.append(width.wrapper, height.wrapper, grid, result);
  update();
}

function renderCoordinateGrid(container, config) {
  const section = createSection(container, config);
  const min = Number(config.min ?? -5), max = Number(config.max ?? 5);
  const xControl = makeRange({ label: 'x coordinate', min, max, value: clamp(config.x ?? 2, min, max) });
  const yControl = makeRange({ label: 'y coordinate', min, max, value: clamp(config.y ?? 3, min, max) });
  const svg = svgElement('svg', { viewBox: '0 0 420 320', class: 'coordinate-grid', role: 'img', 'aria-label': 'Coordinate grid with movable point' });
  const result = document.createElement('div'); result.className = 'interactive-result';
  const sx = value => 40 + ((value - min) / (max - min)) * 340;
  const sy = value => 280 - ((value - min) / (max - min)) * 240;
  for (let value = min; value <= max; value++) {
    svg.appendChild(svgElement('line', { x1: sx(value), y1: 40, x2: sx(value), y2: 280, class: value === 0 ? 'axis' : 'grid-line' }));
    svg.appendChild(svgElement('line', { x1: 40, y1: sy(value), x2: 380, y2: sy(value), class: value === 0 ? 'axis' : 'grid-line' }));
  }
  const point = svgElement('circle', { r: 9, class: 'coordinate-point' });
  const label = svgElement('text', { class: 'coordinate-label' });
  svg.append(point, label);
  const update = () => {
    const x = Number(xControl.input.value), y = Number(yControl.input.value);
    point.setAttribute('cx', sx(x)); point.setAttribute('cy', sy(y));
    label.setAttribute('x', sx(x) + 12); label.setAttribute('y', sy(y) - 12); label.textContent = `(${x}, ${y})`;
    result.textContent = `Point (${x}, ${y})`;
  };
  xControl.input.addEventListener('input', update); yControl.input.addEventListener('input', update);
  section.append(xControl.wrapper, yControl.wrapper, svg, result);
  update();
}

function renderAngleExplorer(container, config) {
  const section = createSection(container, config);
  const angle = makeRange({ label: 'Angle', min: 0, max: 360, value: clamp(config.angle ?? 60, 0, 360) });
  const svg = svgElement('svg', { viewBox: '0 0 400 260', class: 'angle-explorer', role: 'img', 'aria-label': 'Adjustable angle diagram' });
  const base = svgElement('line', { x1: 200, y1: 190, x2: 340, y2: 190, class: 'angle-ray' });
  const ray = svgElement('line', { x1: 200, y1: 190, class: 'angle-ray active' });
  const arc = svgElement('path', { class: 'angle-arc' });
  const text = svgElement('text', { x: 210, y: 160, class: 'angle-label' });
  svg.append(base, ray, arc, text);
  const result = document.createElement('div'); result.className = 'interactive-result';
  const type = value => value === 0 ? 'zero' : value < 90 ? 'acute' : value === 90 ? 'right' : value < 180 ? 'obtuse' : value === 180 ? 'straight' : value < 360 ? 'reflex' : 'full turn';
  const update = () => {
    const degrees = Number(angle.input.value); const radians = degrees * Math.PI / 180;
    const x = 200 + 140 * Math.cos(-radians), y = 190 + 140 * Math.sin(-radians);
    ray.setAttribute('x2', x); ray.setAttribute('y2', y);
    const arcRadius = 55; const ax = 200 + arcRadius * Math.cos(-radians); const ay = 190 + arcRadius * Math.sin(-radians);
    arc.setAttribute('d', `M ${200 + arcRadius} 190 A ${arcRadius} ${arcRadius} 0 ${degrees > 180 ? 1 : 0} 0 ${ax} ${ay}`);
    text.textContent = `${degrees}°`; result.textContent = `${degrees}° is a ${type(degrees)} angle`;
  };
  angle.input.addEventListener('input', update);
  section.append(angle.wrapper, svg, result); update();
}

function renderFunctionSlider(container, config) {
  const section = createSection(container, config);
  const slope = makeRange({ label: 'Slope (m)', min: -5, max: 5, step: 0.5, value: Number(config.slope ?? 1) });
  const intercept = makeRange({ label: 'Intercept (b)', min: -5, max: 5, step: 0.5, value: Number(config.intercept ?? 0) });
  const svg = svgElement('svg', { viewBox: '0 0 420 320', class: 'function-graph', role: 'img', 'aria-label': 'Live graph of y equals m x plus b' });
  const sx = x => 210 + x * 30, sy = y => 160 - y * 24;
  for (let i = -6; i <= 6; i++) {
    svg.appendChild(svgElement('line', { x1: sx(i), y1: 20, x2: sx(i), y2: 300, class: i === 0 ? 'axis' : 'grid-line' }));
    svg.appendChild(svgElement('line', { x1: 20, y1: sy(i), x2: 400, y2: sy(i), class: i === 0 ? 'axis' : 'grid-line' }));
  }
  const line = svgElement('line', { class: 'function-line' }); svg.appendChild(line);
  const result = document.createElement('div'); result.className = 'interactive-result';
  const update = () => {
    const m = Number(slope.input.value), b = Number(intercept.input.value);
    const x1 = -6, x2 = 6, y1 = m * x1 + b, y2 = m * x2 + b;
    line.setAttribute('x1', sx(x1)); line.setAttribute('y1', sy(y1)); line.setAttribute('x2', sx(x2)); line.setAttribute('y2', sy(y2));
    result.textContent = `y = ${m}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}`;
  };
  slope.input.addEventListener('input', update); intercept.input.addEventListener('input', update);
  section.append(slope.wrapper, intercept.wrapper, svg, result); update();
}

function renderProbabilitySpinner(container, config, reducedMotion) {
  const section = createSection(container, config);
  const labels = Array.isArray(config.labels) && config.labels.length >= 2 ? config.labels.slice(0, 8) : ['A', 'B', 'C', 'D'];
  const spinner = document.createElement('div'); spinner.className = 'probability-spinner';
  spinner.style.setProperty('--segments', labels.length);
  spinner.innerHTML = `<div class="spinner-pointer">▼</div><div class="spinner-wheel">${labels.map((label, i) => `<span style="--i:${i}">${escapeText(label)}</span>`).join('')}</div>`;
  const button = document.createElement('button'); button.type = 'button'; button.className = 'btn primary'; button.textContent = 'Spin';
  const result = document.createElement('div'); result.className = 'interactive-result'; result.setAttribute('aria-live', 'polite');
  let rotation = 0;
  button.addEventListener('click', () => {
    const index = Math.floor(Math.random() * labels.length);
    rotation += reducedMotion ? 0 : 720 + (360 - (index * 360 / labels.length + 180 / labels.length));
    spinner.querySelector('.spinner-wheel').style.transform = `rotate(${rotation}deg)`;
    result.textContent = `Result: ${labels[index]} · theoretical probability 1/${labels.length}`;
  });
  section.append(spinner, button, result);
}

const RENDERERS = {
  'quantity-bars': renderQuantityBars,
  'number-line': renderNumberLine,
  'place-value': renderPlaceValue,
  'fraction-bars': renderFractionBars,
  'balance-scale': renderBalanceScale,
  'area-model': renderAreaModel,
  'coordinate-grid': renderCoordinateGrid,
  'angle-explorer': renderAngleExplorer,
  'function-slider': renderFunctionSlider,
  'live-graph': renderFunctionSlider,
  'probability-spinner': renderProbabilitySpinner
};

export const INTERACTIVE_LESSON_TYPES = Object.freeze(Object.keys(RENDERERS));

export function renderInteractiveLesson({ container, interactive, reducedMotion = false }) {
  if (!container || !interactive || typeof interactive !== 'object') return;
  const renderer = RENDERERS[interactive.type];
  if (!renderer) {
    const section = createSection(container, interactive);
    section.insertAdjacentHTML('beforeend', `<p class="status-box content-error">Unknown interactive type: ${escapeText(interactive.type)}</p>`);
    return;
  }
  renderer(container, interactive, reducedMotion);
}
