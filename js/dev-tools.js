const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));

export function createDeveloperTools({
  courses,
  contentReport,
  getPlayer,
  savePlayer,
  jumpToTopic,
  jumpToLesson,
  showView,
  toast
}) {
  const root = document.createElement('div');
  root.id = 'developer-tools-root';
  root.className = 'developer-tools-root';
  root.innerHTML = `
    <button id="dev-tools-toggle" class="dev-tools-toggle" type="button" aria-label="Open developer testing tools" title="Developer testing tools">🛠</button>
    <aside id="dev-tools-panel" class="dev-tools-panel hidden" aria-label="Developer testing tools">
      <div class="dev-tools-head">
        <div><p class="eyebrow">DEVELOPER MODE</p><h2>Testing tools</h2></div>
        <button id="dev-tools-close" class="icon-btn" type="button" aria-label="Close developer tools">✕</button>
      </div>
      <p class="tiny muted">Visible only after enabling developer mode on this device.</p>
      <label class="setting-field">Course<select id="dev-course" class="field"></select></label>
      <label class="setting-field">Topic<select id="dev-topic" class="field"></select></label>
      <label class="setting-field">Lesson<select id="dev-lesson" class="field"></select></label>
      <div class="dev-action-grid">
        <button id="dev-open-topic" class="btn secondary" type="button">Open topic</button>
        <button id="dev-open-lesson" class="btn primary" type="button">Open lesson</button>
        <button id="dev-unlock-all" class="btn secondary" type="button">Unlock all</button>
        <button id="dev-reset-progress" class="btn danger" type="button">Reset progress</button>
        <button id="dev-mobile-preview" class="btn secondary" type="button">Phone preview</button>
        <button id="dev-home" class="btn secondary" type="button">Go home</button>
      </div>
      <div id="dev-content-report" class="status-box"></div>
      <div id="dev-selection-info" class="dev-selection-info"></div>
    </aside>
  `;
  document.body.appendChild(root);

  const $ = id => document.getElementById(id);
  const toggle = $('dev-tools-toggle');
  const panel = $('dev-tools-panel');
  const courseSelect = $('dev-course');
  const topicSelect = $('dev-topic');
  const lessonSelect = $('dev-lesson');

  const enabledByUrl = new URLSearchParams(location.search).get('dev') === '1';
  let enabled = enabledByUrl || localStorage.getItem('stemQuestDevMode') === 'true';

  function setEnabled(value) {
    enabled = Boolean(value);
    localStorage.setItem('stemQuestDevMode', String(enabled));
    root.classList.toggle('dev-disabled', !enabled);
    if (!enabled) panel.classList.add('hidden');
  }

  function courseList() {
    return Object.values(courses || {});
  }

  function selectedCourse() {
    return courses?.[courseSelect.value] || courseList()[0] || null;
  }

  function selectedTopic() {
    return selectedCourse()?.topics?.find(topic => topic.id === topicSelect.value) || selectedCourse()?.topics?.[0] || null;
  }

  function selectedLesson() {
    return selectedTopic()?.lessons?.find(lesson => lesson.id === lessonSelect.value) || selectedTopic()?.lessons?.[0] || null;
  }

  function fillCourses() {
    courseSelect.innerHTML = courseList().map(course => `<option value="${esc(course.id)}">${esc(course.title)}</option>`).join('');
    fillTopics();
  }

  function fillTopics() {
    const course = selectedCourse();
    topicSelect.innerHTML = (course?.topics || []).map(topic => `<option value="${esc(topic.id)}">${esc(topic.title)}</option>`).join('');
    fillLessons();
  }

  function fillLessons() {
    const topic = selectedTopic();
    lessonSelect.innerHTML = (topic?.lessons || []).map(lesson => `<option value="${esc(lesson.id)}">${esc(lesson.title)}</option>`).join('');
    updateSelectionInfo();
  }

  function updateSelectionInfo() {
    const course = selectedCourse();
    const topic = selectedTopic();
    const lesson = selectedLesson();
    const questionIds = (lesson?.questions || []).map(question => question.id);
    const modes = [...new Set((lesson?.questions || []).map(question => question.calculatorMode || (question.calculatorAllowed ? 'basic' : 'none')))];
    $('dev-selection-info').innerHTML = `
      <p><strong>Course:</strong> ${esc(course?.id || '—')}</p>
      <p><strong>Topic:</strong> ${esc(topic?.id || '—')}</p>
      <p><strong>Lesson:</strong> ${esc(lesson?.id || '—')}</p>
      <p><strong>Questions:</strong> ${questionIds.length ? questionIds.map(esc).join(', ') : 'None'}</p>
      <p><strong>Calculator modes:</strong> ${modes.length ? modes.map(esc).join(', ') : 'None'}</p>
    `;
  }

  const counts = contentReport?.counts || {};
  const errors = contentReport?.errors || [];
  const warnings = contentReport?.warnings || [];
  $('dev-content-report').innerHTML = `
    <strong>Content check</strong><br>
    ${counts.courses || 0} courses · ${counts.topics || 0} topics · ${counts.lessons || 0} lessons · ${counts.questions || 0} questions<br>
    ${errors.length} errors · ${warnings.length} warnings
  `;

  toggle.addEventListener('click', () => panel.classList.toggle('hidden'));
  $('dev-tools-close').addEventListener('click', () => panel.classList.add('hidden'));
  courseSelect.addEventListener('change', fillTopics);
  topicSelect.addEventListener('change', fillLessons);
  lessonSelect.addEventListener('change', updateSelectionInfo);

  $('dev-open-topic').addEventListener('click', () => {
    const course = selectedCourse();
    const topic = selectedTopic();
    if (!course || !topic) return;
    jumpToTopic(course.id, topic.id);
    panel.classList.add('hidden');
  });

  $('dev-open-lesson').addEventListener('click', () => {
    const course = selectedCourse();
    const topic = selectedTopic();
    const lesson = selectedLesson();
    if (!course || !topic || !lesson) return;
    jumpToLesson(course.id, topic.id, lesson.id);
    panel.classList.add('hidden');
  });

  $('dev-unlock-all').addEventListener('click', async () => {
    const player = getPlayer();
    player.placementCompleted = true;
    for (const course of courseList()) {
      for (const topic of course.topics || []) {
        player.mastery[topic.id] = Math.max(80, Number(player.mastery[topic.id] || 0));
        if (!player.completedTopics.includes(topic.id)) player.completedTopics.push(topic.id);
        for (const lesson of topic.lessons || []) {
          if (!player.completedLessons.includes(lesson.id)) player.completedLessons.push(lesson.id);
        }
      }
    }
    await savePlayer();
    toast('Developer unlock applied.');
  });

  $('dev-reset-progress').addEventListener('click', async () => {
    if (!confirm('Reset mastery, attempts, stars and completed lessons for this profile?')) return;
    const player = getPlayer();
    player.mastery = {};
    player.attempts = {};
    player.mistakes = [];
    player.completedLessons = [];
    player.lessonStars = {};
    player.lessonBestScores = {};
    player.completedTopics = [];
    player.courseRewards = {};
    player.placementCompleted = false;
    await savePlayer();
    toast('Learning progress reset.');
    showView('home-view');
  });

  $('dev-mobile-preview').addEventListener('click', () => {
    document.body.classList.toggle('dev-phone-preview');
    $('dev-mobile-preview').textContent = document.body.classList.contains('dev-phone-preview') ? 'Exit phone preview' : 'Phone preview';
  });

  $('dev-home').addEventListener('click', () => {
    showView('home-view');
    panel.classList.add('hidden');
  });

  window.addEventListener('keydown', event => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      setEnabled(!enabled);
      if (enabled) {
        panel.classList.remove('hidden');
        toast('Developer tools enabled.');
      } else {
        toast('Developer tools disabled.');
      }
    }
  });

  fillCourses();
  setEnabled(enabled);

  return { setEnabled, refresh: updateSelectionInfo };
}
