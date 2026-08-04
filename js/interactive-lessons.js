function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function createSection(container, title) {
  const section = document.createElement('section');
  section.className = 'interactive-lesson';
  section.innerHTML = `
    <div class="interactive-lesson-head">
      <div>
        <p class="eyebrow">TRY IT YOURSELF</p>
        <h3>${title || 'Interactive example'}</h3>
      </div>
      <span class="badge">Interactive</span>
    </div>
  `;
  container.appendChild(section);
  return section;
}

function renderQuantityBars(container, config) {
  const min = Number(config.min ?? 0);
  const max = Math.max(min + 1, Number(config.max ?? 10));
  const labels = Array.isArray(config.labels) ? config.labels : ['Value A', 'Value B'];
  const initial = Array.isArray(config.values) ? config.values : [3, 4];
  const section = createSection(container, config.title);
  const bars = document.createElement('div');
  bars.className = 'interactive-bars';
  const total = document.createElement('div');
  total.className = 'interactive-total';
  const values = initial.map(value => clamp(value, min, max));

  const update = () => {
    bars.querySelectorAll('[data-bar-fill]').forEach((fill, index) => {
      fill.style.width = `${((values[index] - min) / (max - min)) * 100}%`;
    });
    bars.querySelectorAll('[data-bar-value]').forEach((output, index) => {
      output.textContent = values[index];
    });
    total.textContent = `${values.join(' + ')} = ${values.reduce((sum, value) => sum + value, 0)}`;
  };

  values.forEach((value, index) => {
    const row = document.createElement('label');
    row.className = 'interactive-bar-row';
    row.innerHTML = `
      <strong>${labels[index] || `Value ${index + 1}`}</strong>
      <input type="range" min="${min}" max="${max}" value="${value}" aria-label="${labels[index] || `Value ${index + 1}`}">
      <output data-bar-value>${value}</output>
      <div class="interactive-bar-track" style="grid-column:2 / 3"><div class="interactive-bar-fill" data-bar-fill></div></div>
    `;
    const input = row.querySelector('input');
    input.addEventListener('input', () => {
      values[index] = clamp(input.value, min, max);
      update();
    });
    bars.appendChild(row);
  });

  section.append(bars, total);
  update();
}

function renderNumberLine(container, config) {
  const min = Number(config.min ?? 0);
  const max = Math.max(min + 1, Number(config.max ?? 10));
  const start = clamp(config.start ?? min, min, max);
  const initialStep = Number(config.step ?? 1);
  const section = createSection(container, config.title);
  const controls = document.createElement('div');
  controls.className = 'tool-row';
  controls.innerHTML = `
    <label class="setting-field" style="flex:1">Jump size
      <input class="field" type="range" min="${-Math.max(1,max-min)}" max="${Math.max(1,max-min)}" value="${initialStep}">
    </label>
    <span class="badge" data-jump-output></span>
  `;
  const line = document.createElement('div');
  line.className = 'interactive-number-line';
  const marker = document.createElement('div');
  marker.className = 'interactive-number-marker';
  marker.textContent = '⬇️';
  line.appendChild(marker);

  for (let value = min; value <= max; value += 1) {
    const tick = document.createElement('span');
    tick.className = 'interactive-number-line-tick';
    tick.style.left = `${((value-min)/(max-min))*100}%`;
    tick.textContent = value;
    line.appendChild(tick);
  }

  const input = controls.querySelector('input');
  const output = controls.querySelector('[data-jump-output]');
  const update = () => {
    const step = Number(input.value);
    const end = clamp(start + step, min, max);
    marker.style.left = `${((end-min)/(max-min))*100}%`;
    output.textContent = `${start} ${step >= 0 ? '+' : '−'} ${Math.abs(step)} = ${end}`;
  };
  input.addEventListener('input', update);
  section.append(controls, line);
  update();
}

export function renderInteractiveLesson({ container, interactive }) {
  if (!container || !interactive || typeof interactive !== 'object') return;
  if (interactive.type === 'quantity-bars') renderQuantityBars(container, interactive);
  if (interactive.type === 'number-line') renderNumberLine(container, interactive);
}
