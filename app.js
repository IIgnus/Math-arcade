import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD4pfgVOqGnOfeVCbRdjHaUt1xzK0Cv6wQ',
  authDomain: 'math-game-19070.firebaseapp.com',
  projectId: 'math-game-19070',
  storageBucket: 'math-game-19070.firebasestorage.app',
  messagingSenderId: '1021658486810',
  appId: '1:1021658486810:web:c98decd8bcdef9e0ea99a3'
};

const COURSES = window.STEM_COURSES;
const $ = id => document.getElementById(id);

const DEFAULT_PLAYER = {
  schemaVersion: 2,
  name: 'Guest',
  xp: 0,
  level: 1,
  points: 0,
  streak: 0,
  hearts: 5,
  lastActiveDate: '',
  lastDaily: '',
  dailyScores: {},
  dailyActivity: {},
  mastery: {},
  attempts: {},
  mistakes: [],
  completedLessons: [],
  completedTopics: [],
  unlockedTopics: {},
  achievements: [],
  placementCompleted: false,
  settings: {
    theme: 'quest',
    timer: 0,
    sound: true,
    reducedMotion: false
  }
};

let auth = null;
let db = null;
let firebaseEnabled = false;
let firebaseUser = null;
let localMode = false;

let player = structuredClone(DEFAULT_PLAYER);

let selectedCourseId = 'foundations';
let selectedTopicId = null;
let selectedLessonId = null;
let lessonPageIndex = 0;

let session = {
  mode: 'practice',
  questions: [],
  index: 0,
  correct: 0,
  hearts: 5,
  answered: false,
  startTime: 0,
  timer: null,
  timeLeft: 0,
  config: null
};

try {
  const app = initializeApp(firebaseConfig);

  auth = getAuth(app);
  db = getFirestore(app);
  firebaseEnabled = true;

  $('firebase-status').textContent =
    'Firebase connected. Your progress can sync after Google sign-in.';
} catch (error) {
  console.error(error);

  $('firebase-status').textContent =
    'Firebase is unavailable. Local learning still works.';
}

function mergePlayer(raw = {}) {
  const merged = structuredClone(DEFAULT_PLAYER);

  Object.assign(merged, raw);

  merged.settings = {
    ...DEFAULT_PLAYER.settings,
    ...(raw.settings || {})
  };

  merged.dailyScores ||= {};
  merged.dailyActivity ||= {};
  merged.mastery ||= {};
  merged.attempts ||= {};
  merged.mistakes ||= [];
  merged.completedLessons ||= [];
  merged.completedTopics ||= [];
  merged.unlockedTopics ||= {};
  merged.achievements ||= [];

  for (const [key, value] of Object.entries(raw.mastery || {})) {
    if (typeof value === 'number') {
      merged.mastery[key] = value;
    }
  }

  return merged;
}

async function savePlayer() {
  updateLevel();
  updateStreak();
  updateAchievements();

  const snapshot = JSON.parse(JSON.stringify(player));

  const localKey = localMode
    ? 'stemQuestLocalPlayer'
    : `stemQuestBackup_${firebaseUser?.uid || 'guest'}`;

  localStorage.setItem(localKey, JSON.stringify(snapshot));

  if (firebaseUser && db) {
    try {
      await setDoc(
        doc(db, 'users', firebaseUser.uid),
        {
          ...snapshot,
          updatedAt: serverTimestamp()
        },
        {
          merge: true
        }
      );
    } catch (error) {
      console.error(error);
      toast('Cloud save failed; a local backup was kept.');
    }
  }

  syncUI();
}

async function loadCloudPlayer(user) {
  const reference = doc(db, 'users', user.uid);
  const cloudSnapshot = await getDoc(reference);

  const localBackup = JSON.parse(
    localStorage.getItem(`stemQuestBackup_${user.uid}`) || 'null'
  );

  player = mergePlayer(
    cloudSnapshot.exists()
      ? cloudSnapshot.data()
      : localBackup || {
          name: user.displayName || 'Learner'
        }
  );

  if (!player.name || player.name === 'Guest') {
    player.name = user.displayName || 'Learner';
  }

  await savePlayer();
}

if (firebaseEnabled) {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      return;
    }

    firebaseUser = user;
    localMode = false;

    try {
      await loadCloudPlayer(user);
      enterApp();
    } catch (error) {
      console.error(error);
      toast('Could not load cloud progress.');
    }
  });
}

$('google-login-btn').onclick = async () => {
  if (!firebaseEnabled) {
    toast('Firebase is not configured.');
    return;
  }

  try {
    await signInWithPopup(
      auth,
      new GoogleAuthProvider()
    );
  } catch (error) {
    console.error(error);

    if (error.code === 'auth/popup-closed-by-user') {
      toast('Sign-in was cancelled.');
    } else {
      toast('Google sign-in failed.');
    }
  }
};

$('local-login-btn').onclick = () => {
  const name =
    $('nickname-input').value.trim() ||
    'Local learner';

  localMode = true;
  firebaseUser = null;

  const savedLocalPlayer = JSON.parse(
    localStorage.getItem('stemQuestLocalPlayer') || 'null'
  );

  player = mergePlayer(
    savedLocalPlayer || {
      name
    }
  );

  player.name = name;

  savePlayer();
  enterApp();
};



function enterApp() {
  $('bottom-nav').classList.remove('hidden');

  applySettings();
  showView('home-view');
}

const views = [
  ...document.querySelectorAll('.view')
];

function showView(id) {
  views.forEach(view => {
    view.classList.toggle(
      'active',
      view.id === id
    );
  });

  document
    .querySelectorAll('[data-view]')
    .forEach(button => {
      button.classList.toggle(
        'active',
        button.dataset.view === id
      );
    });
  if (id === 'home-view') {
    renderHome();
  }
  if (id === 'progress-view') {
    renderProgress();
  }
  if (id === 'daily-view') {
    renderDaily();
  }
  if (id === 'tournament-view') {
    renderTournament();
  }
  if (id === 'profile-view') {
    renderProfile();
  }
  window.scrollTo(0, 0);
}

document
  .querySelectorAll('[data-view]')
  .forEach(element => {
    element.onclick = () => {
      showView(element.dataset.view);
    };
  });

document
  .querySelectorAll('[data-view]')
  .forEach(element => {
    element.onclick = () => {
      showView(element.dataset.view);
    };
  });

function syncUI() {
  updateLevel();

  $('streak-tag').textContent =
    `🔥 ${player.streak || 0}`;

  $('heart-tag').textContent =
    `❤️ ${player.hearts ?? 5}`;

  $('xp-tag').textContent =
    `⚡ ${player.xp || 0} XP`;

  $('welcome-name').textContent =
    `Hi, ${player.name}!`;

  $('level-copy').textContent =
    `Level ${player.level} learner`;

  const levelBase = xpForLevel(player.level);
  const nextLevel = xpForLevel(player.level + 1);

  const progressPercent = Math.max(
    0,
    Math.min(
      100,
      (
        (player.xp - levelBase) /
        (nextLevel - levelBase)
      ) * 100
    )
  );

  $('level-fill').style.width =
    `${progressPercent}%`;

  $('level-progress').textContent =
    `${player.xp - levelBase} / ${nextLevel - levelBase} XP`;

  applySettings();
}

function updateLevel() {
  player.level = Math.max(
    1,
    Math.floor(
      Math.sqrt((player.xp || 0) / 100)
    ) + 1
  );
}

function xpForLevel(level) {
  return Math.pow(
    Math.max(0, level - 1),
    2
  ) * 100;
}

function todayKey() {
  return new Date().toLocaleDateString('en-CA');
}

function weekKey() {
  const date = new Date();

  const dayFromMonday =
    (date.getDay() + 6) % 7;

  date.setDate(
    date.getDate() - dayFromMonday
  );

  return date.toLocaleDateString('en-CA');
}

function updateStreak() {
  const today = todayKey();

  if (!player.lastActiveDate) {
    player.lastActiveDate = today;
    return;
  }

  if (player.lastActiveDate === today) {
    return;
  }

  const previous = new Date(
    `${player.lastActiveDate}T00:00:00`
  );

  const current = new Date(
    `${today}T00:00:00`
  );

  const days = Math.round(
    (current - previous) / 86400000
  );

  player.streak =
    days === 1
      ? (player.streak || 0) + 1
      : 1;

  player.lastActiveDate = today;
}

function addDailyActivity() {
  const key = todayKey();

  player.dailyActivity[key] =
    (player.dailyActivity[key] || 0) + 1;
}

function todayActivity() {
  return player.dailyActivity[todayKey()] || 0;
}

function renderHome() {
  syncUI();

  $('goal-value').textContent =
    `${Math.min(3, todayActivity())}/3`;

  $('goal-copy').textContent =
    todayActivity() >= 3
      ? 'Daily goal complete! Come back tomorrow to continue your streak.'
      : 'Complete three learning activities.';

  const goalAngle = Math.min(
    360,
    (todayActivity() / 3) * 360
  );

  document.querySelector(
    '.goal-ring'
  ).style.background =
    `conic-gradient(
      var(--primary) ${goalAngle}deg,
      var(--line) ${goalAngle}deg
    )`;

  $('course-tabs').innerHTML =
    Object.values(COURSES)
      .map(course => `
        <button
          class="course-tab ${
            course.id === selectedCourseId
              ? 'active'
              : ''
          }"
          data-course="${course.id}"
        >
          ${course.icon}
          ${escapeHtml(course.title)}
        </button>
      `)
      .join('');

  document
    .querySelectorAll('[data-course]')
    .forEach(button => {
      button.onclick = () => {
        selectedCourseId =
          button.dataset.course;

        renderHome();
      };
    });

  const course = COURSES[selectedCourseId];

  $('path-map').innerHTML =
    course.topics
      .map((topic, index) => {
        return renderPathNode(
          course,
          topic,
          index
        );
      })
      .join('');

  document
    .querySelectorAll('[data-topic]')
    .forEach(node => {
      node.onclick = () => {
        const topic = findTopic(
          node.dataset.topic
        );

        if (!topicUnlocked(topic)) {
          const prerequisite =
            findTopic(topic.prerequisite);

          toast(
            `Reach 70% mastery in ${
              prerequisite?.title ||
              'the previous topic'
            } first.`
          );

          return;
        }

        selectedTopicId = topic.id;

        renderTopic();
        showView('topic-view');
      };
    });
}

function renderPathNode(
  course,
  topic,
  index
) {
  const mastery =
    getTopicMastery(topic.id);

  const unlocked =
    topicUnlocked(topic);

  const complete =
    mastery >= 80;

  return `
    <button
      class="
        path-node
        ${unlocked ? '' : 'locked'}
        ${complete ? 'complete' : ''}
      "
      data-topic="${topic.id}"
    >
      <div class="node-orb">
        ${unlocked ? topic.icon : '🔒'}
      </div>

      <div>
        <div class="node-meta">
          <span class="eyebrow">
            UNIT ${index + 1}
          </span>

          ${
            complete
              ? '<span class="badge">✓ Mastered</span>'
              : ''
          }
        </div>

        <h3>
          ${escapeHtml(topic.title)}
        </h3>

        <p class="muted">
          ${escapeHtml(topic.description)}
        </p>

        <div class="mini-progress">
          <div style="width:${mastery}%"></div>
        </div>

        <small>
          ${mastery}% mastery
        </small>
      </div>
    </button>
  `;
}

function topicUnlocked(topic) {
  if (!topic) {
    return false;
  }

  if (!topic.prerequisite) {
    return true;
  }

  if (player.placementCompleted) {
    return true;
  }

  return getTopicMastery(
    topic.prerequisite
  ) >= 70;
}

function findTopic(id) {
  for (
    const course of Object.values(COURSES)
  ) {
    const topic =
      course.topics.find(item => {
        return item.id === id;
      });

    if (topic) {
      return topic;
    }
  }

  return null;
}

function findCourseForTopic(id) {
  return Object.values(COURSES).find(
    course => {
      return course.topics.some(
        topic => topic.id === id
      );
    }
  );
}

function getTopicQuestions(topic) {
  return topic.lessons.flatMap(lesson => {
    return lesson.questions.map(question => ({
      ...question,
      topicId: topic.id,
      courseId:
        findCourseForTopic(topic.id).id,
      lessonId: lesson.id
    }));
  });
}

function allQuestions() {
  return Object.values(COURSES).flatMap(
    course => {
      return course.topics.flatMap(topic => {
        return getTopicQuestions(topic);
      });
    }
  );
}

function renderTopic() {
  const topic =
    findTopic(selectedTopicId);

  const course =
    findCourseForTopic(topic.id);

  const mastery =
    getTopicMastery(topic.id);

  $('topic-header').innerHTML = `
    <p class="eyebrow">
      ${escapeHtml(course.title)}
    </p>

    <h1>
      ${topic.icon}
      ${escapeHtml(topic.title)}
    </h1>

    <p class="muted">
      ${escapeHtml(topic.description)}
    </p>

    <div class="mini-progress">
      <div style="width:${mastery}%"></div>
    </div>

    <p>
      <strong>
        ${mastery}% mastery
      </strong>
    </p>
  `;

  $('lesson-cards').innerHTML =
    topic.lessons
      .map((lesson, index) => {
        const complete =
          player.completedLessons.includes(
            lesson.id
          );

        return `
          <div class="lesson-card">
            <div class="lesson-icon">
              ${complete ? '✅' : '📘'}
            </div>

            <div class="grow">
              <p class="eyebrow">
                LESSON ${index + 1}
              </p>

              <h3>
                ${escapeHtml(lesson.title)}
              </h3>

              <p class="muted">
                ${lesson.pages.length}
                learning cards ·
                ${lesson.questions.length}
                practice questions
              </p>
            </div>

            <button
              class="btn ${
                complete
                  ? 'secondary'
                  : 'primary'
              }"
              data-open-lesson="${lesson.id}"
            >
              ${complete ? 'Review' : 'Learn'}
            </button>

            <button
              class="btn secondary"
              data-practice-lesson="${lesson.id}"
            >
              Practice
            </button>
          </div>
        `;
      })
      .join('') +
    `
      <div class="lesson-card">
        <div class="lesson-icon">
          🏁
        </div>

        <div class="grow">
          <p class="eyebrow">
            TOPIC CHECK
          </p>

          <h3>
            ${escapeHtml(topic.title)}
            mastery test
          </h3>

          <p class="muted">
            Complete a timed mixed check
            to strengthen mastery.
          </p>
        </div>

        <button
          class="btn primary"
          id="topic-test-btn"
        >
          Start test
        </button>
      </div>
    `;

  document
    .querySelectorAll('[data-open-lesson]')
    .forEach(button => {
      button.onclick = () => {
        openLesson(
          button.dataset.openLesson
        );
      };
    });

  document
    .querySelectorAll(
      '[data-practice-lesson]'
    )
    .forEach(button => {
      button.onclick = () => {
        startLessonPractice(
          button.dataset.practiceLesson
        );
      };
    });

  $('topic-test-btn').onclick = () => {
    const questions =
      getTopicQuestions(topic);

    startSession({
      mode: 'test',
      topicId: topic.id,
      questions: seededShuffle(
        questions,
        Date.now()
      ).slice(
        0,
        Math.min(8, questions.length)
      ),
      timer: 45
    });
  };
}

function openLesson(id) {
  selectedLessonId = id;
  lessonPageIndex = 0;

  renderLessonPage();
  showView('lesson-view');
}

function currentLesson() {
  return findTopic(selectedTopicId)
    .lessons
    .find(lesson => {
      return lesson.id === selectedLessonId;
    });
}

function renderLessonPage() {
  const lesson = currentLesson();

  const page =
    lesson.pages[lessonPageIndex];

  $('lesson-progress-dots').innerHTML =
    lesson.pages
      .map((_, index) => {
        return `
          <div
            class="
              lesson-dot
              ${
                index < lessonPageIndex
                  ? 'done'
                  : ''
              }
              ${
                index === lessonPageIndex
                  ? 'active'
                  : ''
              }
            "
          ></div>
        `;
      })
      .join('');

  $('lesson-content').innerHTML = `
    <p class="eyebrow">
      ${escapeHtml(lesson.title)}
      ·
      ${lessonPageIndex + 1}/
      ${lesson.pages.length}
    </p>

    <h1>
      ${escapeHtml(page.title)}
    </h1>

    <p>
      ${escapeHtml(page.body)}
    </p>

    <div class="example-box">
      <strong>
        Worked example
      </strong>

      <p>
        ${escapeHtml(page.example)}
      </p>
    </div>
  `;

  $('lesson-prev-btn').disabled =
    lessonPageIndex === 0;

  $('lesson-next-btn').textContent =
    lessonPageIndex ===
    lesson.pages.length - 1
      ? 'Start practice'
      : 'Next';
}

$('lesson-back-btn').onclick = () => {
  renderTopic();
  showView('topic-view');
};

$('lesson-prev-btn').onclick = () => {
  if (lessonPageIndex > 0) {
    lessonPageIndex--;
    renderLessonPage();
  }
};

$('lesson-next-btn').onclick = () => {
  const lesson = currentLesson();

  if (
    lessonPageIndex <
    lesson.pages.length - 1
  ) {
    lessonPageIndex++;
    renderLessonPage();
  } else {
    startLessonPractice(lesson.id);
  }
};

function startLessonPractice(id) {
  const topic =
    findTopic(selectedTopicId);

  const lesson =
    topic.lessons.find(item => {
      return item.id === id;
    });

  selectedLessonId = id;

  const questions =
    lesson.questions.map(question => ({
      ...question,
      topicId: topic.id,
      courseId:
        findCourseForTopic(topic.id).id,
      lessonId: lesson.id
    }));

  startSession({
    mode: 'practice',
    topicId: topic.id,
    lessonId: lesson.id,
    questions: seededShuffle(
      questions,
      Date.now()
    ),
    timer:
      Number(player.settings.timer) || 0
  });
}

function startSession(config) {
  clearInterval(session.timer);

  session = {
    mode: config.mode || 'practice',
    questions: [...config.questions],
    index: 0,
    correct: 0,
    hearts: 5,
    answered: false,
    startTime: Date.now(),
    timer: null,
    timeLeft: 0,
    config: {
      ...config,
      questions: [...config.questions]
    }
  };

  $('scratch-box').classList.add('hidden');
  $('calculator-box').classList.add('hidden');

  strokes = [];
  $('typed-notes').value = '';

  showView('game-view');
  renderQuestion();
}

function renderQuestion() {
  clearInterval(session.timer);

  if (
    session.index >=
    session.questions.length
  ) {
    finishSession();
    return;
  }

  session.answered = false;

  const question =
    session.questions[session.index];

  $('question-progress').style.width =
    `${
      (
        session.index /
        session.questions.length
      ) * 100
    }%`;

  $('quiz-hearts').textContent =
    `❤️ ${session.hearts}`;

  $('hud-topic').textContent =
    findTopic(question.topicId)?.title ||
    'Mixed review';

  $('question-text').textContent =
    question.prompt;

  $('feedback-box').className =
    'feedback-box hidden';

  $('feedback-box').innerHTML = '';

  $('hint-btn').disabled = false;

  $('next-btn').classList.add('hidden');

  $('calculator-box').classList.add(
    'hidden'
  );

  $('calculator-status').textContent =
    question.calculatorAllowed
      ? '🧮 Calculator allowed'
      : '🚫 No calculator';

  $('calculator-btn').classList.toggle(
    'hidden',
    !question.calculatorAllowed
  );

  renderAnswer(question);

  startTimer(
    session.config.timer || 0
  );
}

function renderAnswer(question) {
  const area = $('answer-area');

  area.innerHTML = '';

  if (question.type === 'choice') {
    question.options.forEach(
      (option, index) => {
        const button =
          document.createElement('button');

        button.className = 'option';

        button.innerHTML = `
          <span class="option-key">
            ${String.fromCharCode(
              65 + index
            )}
          </span>

          <span>
            ${escapeHtml(option)}
          </span>
        `;

        button.onclick = () => {
          gradeAnswer(
            index,
            button
          );
        };

        area.appendChild(button);
      }
    );
  } else {
    area.innerHTML = `
      <div class="answer-input-row">
        <input
          id="number-answer"
          class="field"
          type="number"
          inputmode="decimal"
          placeholder="Type your answer"
        >

        <button
          id="submit-number"
          class="btn primary"
        >
          Check
        </button>
      </div>
    `;

    $('submit-number').onclick = () => {
      gradeAnswer(
        Number(
          $('number-answer').value
        ),
        $('submit-number')
      );
    };

    $('number-answer').onkeydown = event => {
      if (event.key === 'Enter') {
        $('submit-number').click();
      }
    };

    $('number-answer').focus();
  }
}

function startTimer(seconds) {
  $('hud-timer').classList.toggle(
    'hidden',
    !seconds
  );

  if (!seconds) {
    return;
  }

  session.timeLeft = seconds;

  $('hud-timer').textContent =
    `⏱ ${seconds}s`;

  session.timer = setInterval(() => {
    session.timeLeft--;

    $('hud-timer').textContent =
      `⏱ ${session.timeLeft}s`;

    if (session.timeLeft <= 0) {
      clearInterval(session.timer);

      gradeAnswer(
        null,
        null,
        true
      );
    }
  }, 1000);
}

function gradeAnswer(
  value,
  clicked,
  timedOut = false
) {
  if (session.answered) {
    return;
  }

  const question =
    session.questions[session.index];

  if (
    question.type === 'number' &&
    !timedOut &&
    !Number.isFinite(value)
  ) {
    toast('Enter a number first.');
    return;
  }

  session.answered = true;

  clearInterval(session.timer);

  const correct =
    question.type === 'choice'
      ? value === question.answer
      : !timedOut &&
        Math.abs(
          value - question.answer
        ) <= question.tolerance;

  const attempt =
    player.attempts[question.id] || {
      total: 0,
      correct: 0,
      recent: []
    };

  attempt.total++;

  if (correct) {
    attempt.correct++;
  }

  attempt.recent = [
    ...(attempt.recent || []),
    correct
  ].slice(-5);

  player.attempts[question.id] =
    attempt;

  const feedback =
    $('feedback-box');

  feedback.classList.remove('hidden');

  if (correct) {
    session.correct++;

    player.xp += question.xp || 10;
    player.points += question.xp || 10;

    feedback.classList.add('correct');

    feedback.innerHTML = `
      <h3>
        ✅ Correct!
      </h3>

      <p>
        ${question.steps
          .map(escapeHtml)
          .join('<br>')}
      </p>
    `;

    if (
      clicked?.classList.contains(
        'option'
      )
    ) {
      clicked.classList.add('correct');
    }

    sound(660, 0.09);

    setTimeout(() => {
      sound(880, 0.12);
    }, 90);

    removeMistake(question.id);
  } else {
    session.hearts = Math.max(
      0,
      session.hearts - 1
    );

    feedback.classList.add('wrong');

    const answer =
      question.type === 'choice'
        ? question.options[
            question.answer
          ]
        : question.answer;

    feedback.innerHTML = `
      <h3>
        ${
          timedOut
            ? '⏰ Time is up'
            : '❌ Not quite'
        }
      </h3>

      <p>
        Correct answer:
        <strong>
          ${escapeHtml(answer)}
        </strong>
      </p>

      <p>
        ${question.steps
          .map(escapeHtml)
          .join('<br>')}
      </p>

      <p class="muted">
        <strong>
          Try this:
        </strong>

        ${escapeHtml(question.hint)}
      </p>
    `;

    if (
      clicked?.classList.contains(
        'option'
      )
    ) {
      clicked.classList.add('wrong');
    }

    recordMistake(question);

    sound(
      170,
      0.18,
      'sawtooth'
    );
  }

  document
    .querySelectorAll(
      '#answer-area button, #answer-area input'
    )
    .forEach(element => {
      element.disabled = true;
    });

  $('quiz-hearts').textContent =
    `❤️ ${session.hearts}`;

  $('next-btn').classList.remove(
    'hidden'
  );

  if (
    session.hearts === 0 &&
    session.mode === 'practice'
  ) {
    $('next-btn').textContent =
      'Finish';
  } else {
    $('next-btn').textContent =
      'Continue';
  }

  updateTopicMastery(
    question.topicId
  );

  savePlayer();
}

function recordMistake(question) {
  const existing =
    player.mistakes.find(item => {
      return item.id === question.id;
    });

  if (existing) {
    existing.count++;
    existing.lastSeen = Date.now();
  } else {
    player.mistakes.unshift({
      id: question.id,
      prompt: question.prompt,
      topicId: question.topicId,
      count: 1,
      lastSeen: Date.now()
    });
  }

  player.mistakes =
    player.mistakes.slice(0, 60);
}

function removeMistake(id) {
  const mistake =
    player.mistakes.find(item => {
      return item.id === id;
    });

  if (!mistake) {
    return;
  }

  if (mistake.count <= 1) {
    player.mistakes =
      player.mistakes.filter(item => {
        return item.id !== id;
      });
  } else {
    mistake.count--;
  }
}

function updateTopicMastery(topicId) {
  if (!topicId) {
    return;
  }

  const topic =
    findTopic(topicId);

  const questions =
    getTopicQuestions(topic);

  let weightedTotal = 0;
  let questionCount = 0;

  questions.forEach(question => {
    const attempt =
      player.attempts[question.id];

    if (!attempt) {
      return;
    }

    const lifetimeAccuracy =
      attempt.correct / attempt.total;

    const recentAnswers =
      attempt.recent || [];

    const recentAccuracy =
      recentAnswers
        .filter(Boolean)
        .length /
      Math.max(
        1,
        recentAnswers.length
      );

    weightedTotal +=
      recentAccuracy * 0.7 +
      lifetimeAccuracy * 0.3;

    questionCount++;
  });

  player.mastery[topicId] =
    questionCount
      ? Math.round(
          (
            weightedTotal /
            questionCount
          ) * 100
        )
      : 0;

  if (
    player.mastery[topicId] >= 80 &&
    !player.completedTopics.includes(
      topicId
    )
  ) {
    player.completedTopics.push(
      topicId
    );
  }
}

function getTopicMastery(id) {
  return Math.round(
    player.mastery[id] || 0
  );
}

$('next-btn').onclick = () => {
  if (
    session.hearts === 0 &&
    session.mode === 'practice'
  ) {
    finishSession();
    return;
  }

  session.index++;
  renderQuestion();
};

$('exit-btn').onclick = () => {
  clearInterval(session.timer);

  const shouldLeave = confirm(
    'Leave this session? Your completed answers are already saved.'
  );

  if (shouldLeave) {
    showView('home-view');
  }
};

$('hint-btn').onclick = () => {
  const question =
    session.questions[session.index];

  modal(`
    <p class="eyebrow">
      HINT
    </p>

    <h2>
      Try this approach
    </h2>

    <p>
      ${escapeHtml(question.hint)}
    </p>
  `);

  $('hint-btn').disabled = true;
};

$('read-btn').onclick = () => {
  if (!player.settings.sound) {
    toast('Enable sound in settings.');
    return;
  }

  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();

    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        $('question-text').textContent
      )
    );
  }
};

function finishSession() {
  clearInterval(session.timer);

  const score =
    Math.round(
      (
        session.correct /
        session.questions.length
      ) * 100
    ) || 0;

  const time = Math.round(
    (
      Date.now() -
      session.startTime
    ) / 1000
  );

  const xpEarned =
    session.correct * 10;

  $('result-score').textContent =
    `${score}%`;

  $('result-summary').textContent =
    `${session.correct} of ${
      session.questions.length
    } correct in ${time} seconds.`;

  $('result-title').textContent =
    score >= 90
      ? 'Outstanding!'
      : score >= 70
        ? 'Great progress!'
        : 'Keep building the skill!';

  $('result-icon').textContent =
    score >= 90
      ? '🏆'
      : score >= 70
        ? '🎉'
        : '🌱';

  $('result-rewards').innerHTML = `
    <span class="reward-chip">
      ⚡ +${xpEarned} XP
    </span>

    <span class="reward-chip">
      🎯 ${score}% accuracy
    </span>
  `;

  if (
    session.config.lessonId &&
    score >= 60 &&
    !player.completedLessons.includes(
      session.config.lessonId
    )
  ) {
    player.completedLessons.push(
      session.config.lessonId
    );
  }

  if (session.mode === 'daily') {
    const firstDailyCompletion =
      player.lastDaily !== todayKey();

    player.lastDaily = todayKey();

    player.dailyScores[todayKey()] =
      Math.max(
        score,
        player.dailyScores[todayKey()] || 0
      );

    if (
      firstDailyCompletion &&
      score >= 60
    ) {
      player.xp += 50;
      player.points += 50;

      toast(
        'Daily challenge complete: +50 bonus XP!'
      );
    }
  }

  if (
    session.mode === 'placement' &&
    score >= 70
  ) {
    player.placementCompleted = true;

    toast(
      'Placement check passed: all current topics are unlocked!'
    );
  }

  if (session.mode === 'tournament') {
    submitTournamentScore(
      score,
      time
    );
  }

  addDailyActivity();
  savePlayer();

  showView('result-view');
}

$('retry-btn').onclick = () => {
  startSession({
    ...session.config,
    questions: [
      ...session.config.questions
    ]
  });
};

$('review-btn').onclick = () => {
  const questions =
    player.mistakes
      .map(mistake => {
        return allQuestions().find(
          question => {
            return question.id === mistake.id;
          }
        );
      })
      .filter(Boolean);

  if (!questions.length) {
    toast(
      'You have no saved mistakes to review.'
    );

    return;
  }

  startSession({
    mode: 'review',
    questions: seededShuffle(
      questions,
      Date.now()
    ).slice(0, 10),
    timer: 0
  });
};

$('placement-btn').onclick = () => {
  const questions =
    Object.values(COURSES)
      .flatMap(course => {
        return course.topics
          .map(topic => {
            return getTopicQuestions(topic)[0];
          })
          .filter(Boolean);
      });

  startSession({
    mode: 'placement',
    questions: seededShuffle(
      questions,
      'placement'
    ).slice(0, 10),
    timer: 0
  });
};

function renderProgress() {
  const totalAttempts =
    Object.values(player.attempts)
      .reduce((sum, attempt) => {
        return sum + attempt.total;
      }, 0);

  const correctAnswers =
    Object.values(player.attempts)
      .reduce((sum, attempt) => {
        return sum + attempt.correct;
      }, 0);

  const accuracy =
    totalAttempts
      ? Math.round(
          (
            correctAnswers /
            totalAttempts
          ) * 100
        )
      : 0;

  $('progress-summary').innerHTML = [
    [
      '⚡',
      player.xp,
      'Total XP'
    ],
    [
      '🔥',
      player.streak,
      'Day streak'
    ],
    [
      '🎯',
      `${accuracy}%`,
      'Accuracy'
    ],
    [
      '✅',
      player.completedTopics.length,
      'Topics mastered'
    ]
  ]
    .map(([icon, value, label]) => {
      return `
        <div class="summary-card">
          <span>
            ${icon}
          </span>

          <strong>
            ${value}
          </strong>

          <small>
            ${label}
          </small>
        </div>
      `;
    })
    .join('');

  $('mastery-list').innerHTML =
    Object.values(COURSES)
      .flatMap(course => {
        return course.topics.map(topic => {
          const mastery =
            getTopicMastery(topic.id);

          return `
            <div class="mastery-row">
              <div class="mastery-head">
                <span>
                  ${topic.icon}
                  ${escapeHtml(topic.title)}
                </span>

                <span>
                  ${mastery}%
                </span>
              </div>

              <div class="mini-progress">
                <div style="width:${mastery}%"></div>
              </div>
            </div>
          `;
        });
      })
      .join('');

  const achievements =
    achievementDefinitions();

  $('achievement-list').innerHTML =
    achievements
      .map(achievement => {
        return `
          <div
            class="achievement ${
              achievement.unlocked
                ? ''
                : 'locked'
            }"
          >
            <h3>
              ${achievement.icon}
              ${escapeHtml(
                achievement.title
              )}
            </h3>

            <p class="muted">
              ${escapeHtml(
                achievement.description
              )}
            </p>
          </div>
        `;
      })
      .join('');

  if (player.mistakes.length) {
    $('mistakes-list').innerHTML =
      player.mistakes
        .slice(0, 12)
        .map(mistake => {
          return `
            <div class="lesson-card">
              <div class="lesson-icon">
                🔁
              </div>

              <div class="grow">
                <strong>
                  ${escapeHtml(
                    mistake.prompt
                  )}
                </strong>

                <p class="muted">
                  Missed ${mistake.count}
                  time${
                    mistake.count === 1
                      ? ''
                      : 's'
                  }
                  ·
                  ${escapeHtml(
                    findTopic(
                      mistake.topicId
                    )?.title ||
                    'Mixed'
                  )}
                </p>
              </div>
            </div>
          `;
        })
        .join('');
  } else {
    $('mistakes-list').innerHTML =
      '<p class="muted">No mistakes saved. Nice work!</p>';
  }
}

function achievementDefinitions() {
  return [
    {
      icon: '🌱',
      title: 'First Step',
      description:
        'Complete your first lesson.',
      unlocked:
        player.completedLessons.length >= 1
    },
    {
      icon: '🔥',
      title: 'On Fire',
      description:
        'Build a 3-day learning streak.',
      unlocked:
        player.streak >= 3
    },
    {
      icon: '🏅',
      title: 'Topic Master',
      description:
        'Reach 80% mastery in a topic.',
      unlocked:
        player.completedTopics.length >= 1
    },
    {
      icon: '⚡',
      title: 'XP Explorer',
      description:
        'Earn 500 total XP.',
      unlocked:
        player.xp >= 500
    },
    {
      icon: '🧹',
      title: 'Mistake Cleaner',
      description:
        'Clear all saved mistakes after making progress.',
      unlocked:
        player.completedLessons.length > 0 &&
        player.mistakes.length === 0
    }
  ];
}

function updateAchievements() {
  player.achievements =
    achievementDefinitions()
      .filter(achievement => {
        return achievement.unlocked;
      })
      .map(achievement => {
        return achievement.title;
      });
}

function dailyQuestions() {
  return seededShuffle(
    allQuestions(),
    todayKey()
  ).slice(0, 7);
}

function renderDaily() {
  const completed =
    player.lastDaily === todayKey();

  $('daily-description').textContent =
    `${todayKey()} · seven shared questions · calculator rules vary.`;

  $('daily-status').innerHTML =
    completed
      ? `✅ Best score today: <strong>${
          player.dailyScores[
            todayKey()
          ] || 0
        }%</strong>. You can replay for practice.`
      : 'Score at least 60% to earn 50 bonus XP.';

  $('start-daily-btn').textContent =
    completed
      ? 'Replay daily challenge'
      : 'Start daily challenge';
}

$('start-daily-btn').onclick = () => {
  startSession({
    mode: 'daily',
    questions: dailyQuestions(),
    timer: 45
  });
};

function tournamentQuestions() {
  return seededShuffle(
    allQuestions(),
    weekKey()
  ).slice(0, 10);
}

function renderTournament() {
  $('tournament-info').innerHTML = `
    League week:
    <strong>
      ${weekKey()}
    </strong>
    <br>
    Ten shared questions.
    Google sign-in is required
    to submit a score.
  `;

  $('start-tournament-btn').disabled =
    !firebaseUser;

  if (firebaseUser) {
    loadLeaderboard();
  } else {
    $('leaderboard-wrap').textContent =
      'Sign in with Google to load and submit cloud scores.';
  }
}

$('start-tournament-btn').onclick = () => {
  startSession({
    mode: 'tournament',
    questions: tournamentQuestions(),
    timer: 40
  });
};

async function submitTournamentScore(
  score,
  time
) {
  if (!firebaseUser || !db) {
    return;
  }

  try {
    const reference = doc(
      db,
      'tournaments',
      weekKey(),
      'scores',
      firebaseUser.uid
    );

    const currentSnapshot =
      await getDoc(reference);

    const oldScore =
      currentSnapshot.exists()
        ? currentSnapshot.data()
        : null;

    const better =
      !oldScore ||
      score > oldScore.score ||
      (
        score === oldScore.score &&
        time < oldScore.time
      );

    if (better) {
      await setDoc(reference, {
        uid: firebaseUser.uid,
        name: player.name,
        score,
        time,
        updatedAt: serverTimestamp()
      });
    }

    toast(
      better
        ? 'Tournament score submitted!'
        : 'Your existing tournament score is better.'
    );
  } catch (error) {
    console.error(error);

    toast(
      'Tournament submission failed. Check Firestore rules.'
    );
  }
}

async function loadLeaderboard() {
  try {
    const leaderboardQuery = query(
      collection(
        db,
        'tournaments',
        weekKey(),
        'scores'
      ),
      orderBy('score', 'desc'),
      orderBy('time', 'asc'),
      limit(30)
    );

    const snapshot =
      await getDocs(leaderboardQuery);

    const rows =
      snapshot.docs
        .map((documentSnapshot, index) => {
          const score =
            documentSnapshot.data();

          return `
            <tr>
              <td>
                ${index + 1}
              </td>

              <td>
                ${escapeHtml(
                  score.name || 'Learner'
                )}
              </td>

              <td>
                ${score.score}%
              </td>

              <td>
                ${score.time}s
              </td>
            </tr>
          `;
        })
        .join('');

    $('leaderboard-wrap').innerHTML =
      rows
        ? `
          <table class="leaderboard">
            <thead>
              <tr>
                <th>#</th>
                <th>Learner</th>
                <th>Accuracy</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
            </tbody>
          </table>
        `
        : 'No scores yet. Be the first!';
  } catch (error) {
    console.error(error);

    $('leaderboard-wrap').textContent =
      'Leaderboard unavailable. Firebase may ask you to create a composite index.';
  }
}

$('save-settings-btn').onclick = () => {
  player.settings = {
    theme: $('theme-select').value,
    timer: Number(
      $('timer-select').value
    ),
    sound:
      $('sound-toggle').checked,
    reducedMotion:
      $('reduced-motion-toggle').checked
  };

  applySettings();
  savePlayer();

  toast('Settings saved.');
};

function calculateOverallAccuracy() {
  const attempts =
    Object.values(player.attempts || {});

  const totalAnswers =
    attempts.reduce((total, attempt) => {
      return total + Number(
        attempt.total || 0
      );
    }, 0);

  const correctAnswers =
    attempts.reduce((total, attempt) => {
      return total + Number(
        attempt.correct || 0
      );
    }, 0);

  if (totalAnswers === 0) {
    return 0;
  }

  return Math.round(
    (
      correctAnswers /
      totalAnswers
    ) * 100
  );
}

function renderProfile() {
  updateLevel();

  const accountType =
    firebaseUser
      ? 'Google account · Cloud saving enabled'
      : 'Local account · Saved on this device';

  $('profile-display-name').textContent =
    player.name || 'Learner';

  $('profile-account-type').textContent =
    accountType;

  $('profile-level-badge').textContent =
    `Level ${player.level}`;

  $('profile-xp-copy').textContent =
    `${player.xp || 0} total XP`;

  $('profile-streak-value').textContent =
    player.streak || 0;

  $('profile-accuracy-value').textContent =
    `${calculateOverallAccuracy()}%`;

  $('profile-lessons-value').textContent =
    player.completedLessons?.length || 0;

  $('profile-topics-value').textContent =
    player.completedTopics?.length || 0;

  $('profile-name-input').value =
    player.name || '';

  $('profile-save-description').textContent =
    firebaseUser
      ? 'Your progress is synced through your Google account.'
      : 'Your progress is saved only in this browser on this device.';

  applySettings();
}

$('save-profile-btn').onclick = async () => {
  const newName =
    $('profile-name-input').value.trim();

  if (!newName) {
    toast('Enter a display name first.');
    return;
  }

  if (newName.length < 2) {
    toast(
      'Your display name must contain at least two characters.'
    );

    return;
  }

  player.name = newName;

  await savePlayer();

  renderProfile();
  renderHome();

  toast('Profile name saved.');
};

$('profile-logout-btn').onclick = () => {
  showLogoutConfirmation();
};

function showLogoutConfirmation() {
  const cloudMessage =
    firebaseUser
      ? 'Your cloud progress has been saved and will be available when you sign in again.'
      : 'Your local progress will remain saved in this browser on this device.';

  modal(`
    <div class="logout-confirmation">
      <div class="confirmation-icon">
        👋
      </div>

      <p class="eyebrow">
        LOG OUT
      </p>

      <h2>
        Are you sure you want to log out?
      </h2>

      <p class="muted">
        ${escapeHtml(cloudMessage)}
      </p>

      <div class="confirmation-actions">
        <button
          id="cancel-logout-btn"
          class="btn secondary"
        >
          Stay signed in
        </button>

        <button
          id="confirm-logout-btn"
          class="btn danger"
        >
          Yes, log out
        </button>
      </div>
    </div>
  `);

  $('overlay-close').classList.add('hidden');

  $('cancel-logout-btn').onclick = () => {
    closeAppModal();
  };

  $('confirm-logout-btn').onclick =
    async () => {
      await performLogout();
    };
}

function closeAppModal() {
  $('overlay').classList.add('hidden');
  $('overlay-close').classList.remove('hidden');
}

async function performLogout() {
  try {
    await savePlayer();

    if (firebaseUser && auth) {
      await signOut(auth);
    }
    firebaseUser = null;
    localMode = false;
    player =
      structuredClone(DEFAULT_PLAYER);
    clearInterval(session.timer);
    $('bottom-nav').classList.add('hidden');
    closeAppModal();
    $('nickname-input').value = '';
    showView('auth-view');
    syncUI();
    toast('You have been logged out.');
  } catch (error) {
    console.error(error);

    toast(
      'Logout failed. Please try again.'
    );
  }
}

$('theme-select').onchange = () => {
  player.settings.theme =
    $('theme-select').value;

  applySettings();
};

function applySettings() {
  document.body.className =
    player.settings.theme === 'quest'
      ? ''
      : `theme-${player.settings.theme}`;

  document.body.classList.toggle(
    'reduced-motion',
    Boolean(
      player.settings.reducedMotion
    )
  );

  $('theme-select').value =
    player.settings.theme || 'quest';

  $('timer-select').value =
    String(player.settings.timer || 0);

  $('sound-toggle').checked =
    player.settings.sound !== false;

  $('reduced-motion-toggle').checked =
    Boolean(
      player.settings.reducedMotion
    );
}

const canvas =
  $('scratch-canvas');

const context =
  canvas.getContext('2d');

let drawing = false;
let strokes = [];
let currentStroke = [];

context.lineCap = 'round';
context.lineJoin = 'round';

function canvasPoint(event) {
  const rectangle =
    canvas.getBoundingClientRect();

  return {
    x:
      (
        event.clientX -
        rectangle.left
      ) *
      (
        canvas.width /
        rectangle.width
      ),

    y:
      (
        event.clientY -
        rectangle.top
      ) *
      (
        canvas.height /
        rectangle.height
      )
  };
}

function redraw() {
  context.fillStyle = '#ffffff';

  context.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  context.strokeStyle = '#17202a';

  context.lineWidth =
    Number($('pen-size').value);

  for (const stroke of strokes) {
    if (stroke.length < 2) {
      continue;
    }

    context.beginPath();

    context.moveTo(
      stroke[0].x,
      stroke[0].y
    );

    stroke
      .slice(1)
      .forEach(point => {
        context.lineTo(
          point.x,
          point.y
        );
      });

    context.stroke();
  }
}

canvas.onpointerdown = event => {
  drawing = true;

  currentStroke = [
    canvasPoint(event)
  ];

  canvas.setPointerCapture(
    event.pointerId
  );
};

canvas.onpointermove = event => {
  if (!drawing) {
    return;
  }

  currentStroke.push(
    canvasPoint(event)
  );

  strokes.push(currentStroke);

  redraw();

  strokes.pop();
};

canvas.onpointerup =
canvas.onpointercancel = () => {
  if (!drawing) {
    return;
  }

  drawing = false;

  if (currentStroke.length) {
    strokes.push(currentStroke);
  }

  currentStroke = [];

  redraw();
};

$('scratch-btn').onclick = () => {
  $('scratch-box').classList.toggle(
    'hidden'
  );

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

$('clear-notes-btn').onclick = () => {
  $('typed-notes').value = '';
};

document
  .querySelectorAll('.symbol-btn')
  .forEach(button => {
    button.onclick = () => {
      const textArea =
        $('typed-notes');

      const start =
        textArea.selectionStart;

      textArea.value =
        textArea.value.slice(
          0,
          start
        ) +
        button.textContent +
        textArea.value.slice(
          textArea.selectionEnd
        );

      textArea.focus();

      textArea.selectionStart =
      textArea.selectionEnd =
        start +
        button.textContent.length;
    };
  });

document
  .querySelectorAll('[data-scratch]')
  .forEach(button => {
    button.onclick = () => {
      document
        .querySelectorAll(
          '[data-scratch]'
        )
        .forEach(tab => {
          tab.classList.toggle(
            'active',
            tab === button
          );
        });

      $('draw-pane').classList.toggle(
        'active',
        button.dataset.scratch ===
          'draw'
      );

      $('type-pane').classList.toggle(
        'active',
        button.dataset.scratch ===
          'type'
      );
    };
  });

redraw();

const calculatorKeys = [
  '7',
  '8',
  '9',
  '÷',
  '4',
  '5',
  '6',
  '×',
  '1',
  '2',
  '3',
  '−',
  '0',
  '.',
  'C',
  '+',
  '=',
  '(',
  ')',
  '√',
  '⌫'
];

calculatorKeys.forEach(key => {
  const button =
    document.createElement('button');

  button.className =
    'btn secondary';

  button.textContent = key;

  button.onclick = () => {
    calculatorPress(key);
  };

  $('calc-grid').appendChild(button);
});

$('calculator-btn').onclick = () => {
  $('calculator-box').classList.toggle(
    'hidden'
  );
};

function calculatorPress(key) {
  const display =
    $('calc-display');

  if (key === 'C') {
    display.value = '';
    return;
  }

  if (key === '⌫') {
    display.value =
      display.value.slice(0, -1);

    return;
  }

  if (key === '=') {
    try {
      let expression =
        display.value
          .replaceAll('×', '*')
          .replaceAll('÷', '/')
          .replaceAll('−', '-')
          .replaceAll(
            '√',
            'Math.sqrt'
          );

      if (
        !/^[0-9+\-*/().\sMathsqrt]+$/.test(
          expression
        )
      ) {
        throw new Error(
          'Invalid expression'
        );
      }

      const value = Function(
        `"use strict"; return (${expression})`
      )();

      display.value =
        Number.isFinite(value)
          ? String(value)
          : 'Error';
    } catch {
      display.value = 'Error';
    }

    return;
  }

  display.value += key;
}

function modal(html) {
  $('overlay-content').innerHTML =
    html;

  $('overlay').classList.remove(
    'hidden'
  );
}

$('overlay-close').onclick = () => {
  closeAppModal();
};

function toast(message) {
  const toastElement =
    $('toast');

  toastElement.textContent =
    message;

  toastElement.classList.remove(
    'hidden'
  );

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    toastElement.classList.add(
      'hidden'
    );
  }, 2800);
}

function sound(
  frequency,
  duration,
  type = 'sine'
) {
  if (!player.settings.sound) {
    return;
  }

  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    const audioContext =
      new AudioContextClass();

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value =
      frequency;

    gain.gain.value = 0.05;

    oscillator.connect(gain);
    gain.connect(
      audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime +
      duration
    );
  } catch {
    // Audio is optional.
  }
}

function seededShuffle(
  array,
  seed
) {
  let hash = 2166136261;

  for (const character of String(seed)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(
      hash,
      16777619
    );
  }

  const output = [...array];

  for (
    let index = output.length - 1;
    index > 0;
    index--
  ) {
    hash =
      (
        Math.imul(
          hash,
          1664525
        ) +
        1013904223
      ) >>> 0;

    const randomIndex =
      hash % (index + 1);

    [
      output[index],
      output[randomIndex]
    ] = [
      output[randomIndex],
      output[index]
    ];
  }

  return output;
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>'"]/g,
    character => {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[character];
    }
  );
}

syncUI();
