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
  addDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

import { loadContent, formatContentReport } from './js/content-loader.js';
import { createQuizSession, isAnswerCorrect, recordQuestionAttempt, calculateSessionScore } from './js/quiz-engine.js';
import { getTopicMastery as readTopicMastery, updateTopicMastery as recalculateTopicMastery, isTopicUnlocked, isLessonUnlocked as lessonUnlockedByProgress, calculateLessonStars, calculatorUnlocks as getCalculatorUnlocks } from './js/progression.js';
import { createCalculator } from './js/calculator.js';
import { createScratchpad } from './js/scratchpad.js';
import { createAppState } from './js/app-state.js';
import { createNavigation } from './js/navigation.js';
import { createSaveService } from './js/save-service.js';
import { createErrorHandler } from './js/error-handler.js';
import { renderInteractiveLesson } from './js/interactive-lessons.js';
import { createDeveloperTools } from './js/dev-tools.js';
import { createBackendService } from './js/backend-service.js';
import { createSocialService } from './js/social-service.js';

const APP_VERSION = '11.1.0-rc1';
const BUILD_LABEL = 'Social Backend RC';

const firebaseConfig = {
  apiKey: 'AIzaSyD4pfgVOqGnOfeVCbRdjHaUt1xzK0Cv6wQ',
  authDomain: 'math-game-19070.firebaseapp.com',
  projectId: 'math-game-19070',
  storageBucket: 'math-game-19070.firebasestorage.app',
  messagingSenderId: '1021658486810',
  appId: '1:1021658486810:web:c98decd8bcdef9e0ea99a3'
};

const { courses: COURSES, report: CONTENT_REPORT } = loadContent(window.STEM_COURSES);
const $ = id => document.getElementById(id);

function ensureSystemUI() {
  if (!$('save-status')) {
    const badge = document.createElement('div');
    badge.id = 'save-status';
    badge.className = 'save-status hidden';
    badge.setAttribute('aria-live', 'polite');
    document.body.appendChild(badge);
  }

  if (!$('app-loading')) {
    const loading = document.createElement('div');
    loading.id = 'app-loading';
    loading.className = 'app-loading hidden';
    loading.innerHTML = '<div class="app-loading-card"><div class="loading-spinner"></div><strong id="app-loading-copy">Loading STEM Quest…</strong></div>';
    document.body.appendChild(loading);
  }
}

ensureSystemUI();

if (!$('build-chip')) {
  const buildChip = document.createElement('div');
  buildChip.id = 'build-chip';
  buildChip.className = 'build-chip';
  buildChip.textContent = `v${APP_VERSION} · ${BUILD_LABEL}`;
  document.body.appendChild(buildChip);
}

function setLoading(visible, message = 'Loading STEM Quest…') {
  $('app-loading-copy').textContent = message;
  $('app-loading').classList.toggle('hidden', !visible);
}

function updateSaveStatus({ state }) {
  const badge = $('save-status');
  badge.classList.remove('hidden', 'saving', 'saved', 'error');
  badge.classList.add(state);
  badge.textContent = state === 'saving' ? 'Saving…' : state === 'error' ? 'Save failed' : 'Saved';

  if (state === 'saved') {
    clearTimeout(updateSaveStatus.timer);
    updateSaveStatus.timer = setTimeout(() => badge.classList.add('hidden'), 1600);
  }
}

const DEFAULT_PLAYER = {
  schemaVersion: 2,
  name: 'Guest',
  avatar: '🧑‍🚀',
  bio: '',
  region: 'hidden',
  regionVisible: false,
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
  lessonStars: {},
  lessonBestScores: {},
  completedTopics: [],
  courseRewards: {},
  unlockedTopics: {},
  achievements: [],
  placementCompleted: false,
  settings: {
    theme: 'quest',
    timer: 0,
    sound: true,
    reducedMotion: false,
    fontSize: 'normal',
    highContrast: false,
    extraTime: false,
    speechRate: 1
  }
};

let firebaseApp = null;
let auth = null;
let db = null;
let backendService = null;
let socialService = null;
let backendFlags = { showOnboarding: true, tournamentsEnabled: true, developerToolsEnabled: false, maintenanceMessage: '' };
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

const appState = createAppState();
let navigationStarted = false;

try {
  firebaseApp = initializeApp(firebaseConfig);

  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  backendService = createBackendService({
    app: firebaseApp,
    config: firebaseConfig,
    onStatus({ services, flags }) {
      backendFlags = flags;
      const copy = $('backend-status-copy');
      if (copy) copy.textContent = services.length ? `${services.join(' + ')} ready` : 'Core Firebase ready';
      const remoteMessage = $('remote-message');
      if (remoteMessage && flags.maintenanceMessage) {
        remoteMessage.textContent = flags.maintenanceMessage;
        remoteMessage.classList.remove('hidden');
      }
    }
  });
  backendService.initialize().catch(console.warn);
  socialService = createSocialService({
    app: firebaseApp,
    db,
    getUser: () => firebaseUser
  });
  firebaseEnabled = true;

  $('firebase-status').textContent =
    'Firebase connected. Your progress can sync after Google sign-in.';
} catch (error) {
  console.error(error);

  $('firebase-status').textContent =
    'Firebase is unavailable. Local learning still works.';
}


const errorHandler = createErrorHandler({ toast, modal });

function currentLocalKey() {
  return localMode
    ? 'stemQuestLocalPlayer'
    : `stemQuestBackup_${firebaseUser?.uid || 'guest'}`;
}

const saveService = createSaveService({
  writeLocal(snapshot) {
    localStorage.setItem(currentLocalKey(), JSON.stringify({
      ...snapshot,
      localSavedAt: Date.now()
    }));
  },
  async writeCloud(snapshot) {
    if (!firebaseUser || !db || !navigator.onLine) return;

    await setDoc(
      doc(db, 'users', firebaseUser.uid),
      {
        ...snapshot,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  },
  onStatus: updateSaveStatus,
  onError(error) {
    updateSaveStatus({ state: 'error' });
    errorHandler.report(error, 'Player save');
  }
});

function mergePlayer(raw = {}) {
  const merged = structuredClone(DEFAULT_PLAYER);

  Object.assign(merged, raw);

  merged.settings = {
    ...DEFAULT_PLAYER.settings,
    ...(raw.settings || {})
  };

  merged.avatar ||= DEFAULT_PLAYER.avatar;
  merged.bio = typeof merged.bio === 'string' ? merged.bio : '';
  merged.region ||= 'hidden';
  merged.regionVisible = Boolean(merged.regionVisible);
    merged.dailyScores ||= {};
  merged.dailyActivity ||= {};
  merged.mastery ||= {};
  merged.attempts ||= {};
  merged.mistakes ||= [];
  merged.completedLessons ||= [];
  merged.lessonStars ||= {};
  merged.lessonBestScores ||= {};
  merged.completedTopics ||= [];
  merged.courseRewards ||= {};
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

  try {
    await saveService.save(snapshot, {
      cloud: Boolean(firebaseUser && db)
    });
  } catch {
    toast('Cloud save failed; a local backup was kept.');
  }

  syncUI();
}

async function loadCloudPlayer(user) {
  setLoading(true, 'Loading your progress…');

  const reference = doc(db, 'users', user.uid);
  const cloudSnapshot = await getDoc(reference);
  const localBackup = JSON.parse(
    localStorage.getItem(`stemQuestBackup_${user.uid}`) || 'null'
  );

  player = mergePlayer(
    cloudSnapshot.exists()
      ? cloudSnapshot.data()
      : localBackup || { name: user.displayName || 'Learner' }
  );

  if (!player.name || player.name === 'Guest') {
    player.name = user.displayName || 'Learner';
  }

  await savePlayer();
  await syncSocialProfile();
  setLoading(false);
}

async function syncSocialProfile() {
  if (!firebaseUser || !socialService) return null;
  try {
    return await socialService.ensureProfile({
      displayName: player.name,
      avatar: player.avatar,
      level: player.level,
      region: player.region,
      regionVisible: player.regionVisible
    });
  } catch (error) {
    console.warn('Social profile sync unavailable:', error);
    return null;
  }
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

  // Every fresh login starts on the main menu instead of reopening
  // a lesson, quiz or result screen from the previous session.
  clearInterval(session.timer);
  session = createQuizSession({
    mode: 'practice',
    questions: []
  });

  selectedTopicId = null;
  selectedLessonId = null;
  lessonPageIndex = 0;

  appState.clear();
  appState.write({
    viewId: 'home-view',
    selectedCourseId,
    selectedTopicId: null,
    selectedLessonId: null,
    lessonPageIndex: 0,
    activeQuiz: false
  });

  if (!navigationStarted) {
    navigation.start('home-view');
    navigationStarted = true;
  } else {
    showView('home-view', { replace: true });
  }

  setLoading(false);
  backendService?.track('login_complete', { mode: firebaseUser ? 'google' : 'local' });
  maybeShowOnboarding();
}

function maybeShowOnboarding() {
  if (!backendFlags.showOnboarding) return;
  const key = `stemQuestOnboarding_${APP_VERSION.split('.')[0]}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, 'shown');
  setTimeout(() => {
    modal(`
      <p class="eyebrow">WELCOME TO STEM QUEST</p>
      <h2>Your learning path is ready</h2>
      <div class="onboarding-steps">
        <div class="onboarding-step"><span>📘</span><div><strong>Learn visually</strong><p class="muted">Move sliders, explore models and read short worked examples.</p></div></div>
        <div class="onboarding-step"><span>⭐</span><div><strong>Build mastery</strong><p class="muted">Complete lessons, earn stars and unlock new topics.</p></div></div>
        <div class="onboarding-step"><span>🧰</span><div><strong>Use learning tools</strong><p class="muted">Open the scratchpad or an approved calculator during questions.</p></div></div>
      </div>
      <p class="tiny muted">You can change text size, contrast, motion and timing from Profile.</p>
    `);
  }, 350);
}

const views = [
  ...document.querySelectorAll('.view')
];

function renderView(id) {
  views.forEach(view => {
    view.classList.toggle('active', view.id === id);
  });

  document.querySelectorAll('[data-view]').forEach(button => {
    button.classList.toggle('active', button.dataset.view === id);
  });

  if (id === 'home-view') renderHome();
  if (id === 'progress-view') renderProgress();
  if (id === 'daily-view') renderDaily();
  if (id === 'tournament-view') renderTournament();
  if (id === 'profile-view') renderProfile();

  appState.write({
    viewId: id,
    selectedCourseId,
    selectedTopicId,
    selectedLessonId,
    lessonPageIndex
  });

  backendService?.track('screen_view', { screen_name: id });
  window.scrollTo(0, 0);
}

const navigation = createNavigation({
  initialView: 'home-view',
  canLeaveCurrentView(currentView, targetView) {
    if (currentView !== 'game-view' || targetView === 'game-view' || targetView === 'result-view') {
      return true;
    }

    return confirm('Leave this quiz? Your completed answers are saved, but the current session will end.');
  },
  onNavigate: renderView,
  onBlocked() {
    toast('Finish or exit the current quiz first.');
  }
});

function showView(id, options = {}) {
  return navigation.navigate(id, options);
}

document.querySelectorAll('[data-view]').forEach(element => {
  element.onclick = () => showView(element.dataset.view);
});

function syncUI() {
  updateLevel();

  $('streak-tag').textContent =
    `🔥 ${player.streak || 0}`;

  $('heart-tag').textContent =
    `❤️ ${player.hearts ?? 5}`;

  $('xp-tag').textContent =
    `⚡ ${player.xp || 0} XP`;

  if ($('top-profile-level')) {
    $('top-profile-level').textContent = `Lvl ${player.level}`;
  }

  if ($('top-profile-avatar')) $('top-profile-avatar').textContent = player.avatar || DEFAULT_PLAYER.avatar;
  document.querySelectorAll('[data-player-avatar]').forEach(element => {
    element.textContent = player.avatar || DEFAULT_PLAYER.avatar;
  });

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
  return isTopicUnlocked(player, topic, getTopicMastery);
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
  const topic = findTopic(selectedTopicId);
  const course = findCourseForTopic(topic.id);
  const mastery = getTopicMastery(topic.id);
  const allLessonsComplete = topic.lessons.every(lesson =>
    player.completedLessons.includes(lesson.id)
  );

  $('topic-header').innerHTML = `
    <p class="eyebrow">${escapeHtml(course.title)}</p>
    <h1>${topic.icon} ${escapeHtml(topic.title)}</h1>
    <p class="muted">${escapeHtml(topic.description)}</p>
    <div class="mini-progress"><div style="width:${mastery}%"></div></div>
    <p><strong>${mastery}% mastery</strong></p>
  `;

  $('lesson-cards').innerHTML =
    topic.lessons.map((lesson, index) => {
      const complete = player.completedLessons.includes(lesson.id);
      const unlocked = isLessonUnlocked(topic, index);
      const stars = player.lessonStars[lesson.id] || 0;
      const starText = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

      return `
        <div class="lesson-card ${unlocked ? '' : 'lesson-locked'}">
          <div class="lesson-icon">${unlocked ? (complete ? '✅' : '📘') : '🔒'}</div>
          <div class="grow">
            <p class="eyebrow">LESSON ${index + 1}</p>
            <h3>${escapeHtml(lesson.title)}</h3>
            <p class="muted">${lesson.pages.length} learning cards · ${lesson.questions.length} practice questions</p>
            <div class="lesson-stars" aria-label="${stars} out of 3 stars">${starText}</div>
          </div>
          <button class="btn ${complete ? 'secondary' : 'primary'}"
            data-open-lesson="${lesson.id}" ${unlocked ? '' : 'disabled'}>
            ${unlocked ? (complete ? 'Review' : 'Learn') : 'Locked'}
          </button>
          <button class="btn secondary"
            data-practice-lesson="${lesson.id}" ${unlocked ? '' : 'disabled'}>
            Practice
          </button>
        </div>
      `;
    }).join('') +
    `
      <div class="lesson-card ${allLessonsComplete ? '' : 'lesson-locked'}">
        <div class="lesson-icon">${allLessonsComplete ? '🏁' : '🔒'}</div>
        <div class="grow">
          <p class="eyebrow">TOPIC CHECK</p>
          <h3>${escapeHtml(topic.title)} mastery test</h3>
          <p class="muted">${
            allLessonsComplete
              ? 'Score 70% or higher to strengthen mastery.'
              : 'Complete every lesson in this topic to unlock the mastery test.'
          }</p>
        </div>
        <button class="btn primary" id="topic-test-btn" ${allLessonsComplete ? '' : 'disabled'}>
          ${allLessonsComplete ? 'Start test' : 'Locked'}
        </button>
      </div>
    `;

  document.querySelectorAll('[data-open-lesson]').forEach(button => {
    button.onclick = () => openLesson(button.dataset.openLesson);
  });

  document.querySelectorAll('[data-practice-lesson]').forEach(button => {
    button.onclick = () => startLessonPractice(button.dataset.practiceLesson);
  });

  $('topic-test-btn').onclick = () => {
    if (!allLessonsComplete) {
      toast('Complete every lesson in this topic first.');
      return;
    }

    const questions = getTopicQuestions(topic);
    startSession({
      mode: 'test',
      topicId: topic.id,
      questions: seededShuffle(questions, Date.now()).slice(0, Math.min(10, questions.length)),
      timer: 45
    });
  };
}

function isLessonUnlocked(topic, index) {
  return lessonUnlockedByProgress(player, topic, index);
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

  renderInteractiveLesson({
    container: $('lesson-content'),
    interactive: page.interactive,
    reducedMotion: Boolean(player.settings.reducedMotion)
  });

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

  session = createQuizSession(config);

  $('scratch-box').classList.add('hidden');
  $('calculator-box').classList.add('hidden');

  scratchpad.reset();

  appState.write({ viewId: 'game-view', activeQuiz: true });
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

  $('question-counter').textContent = `${session.index + 1} / ${session.questions.length}`;

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

  const allowedMode = allowedCalculatorMode(question);
  const modeLabels = {
    none: '🚫 No calculator',
    basic: '🧮 Basic calculator',
    scientific: '🧪 Scientific calculator',
    graphing: '📈 Graphing calculator'
  };

  $('calculator-status').textContent = modeLabels[allowedMode];
  $('calculator-btn').classList.toggle('hidden', allowedMode === 'none');
  configureCalculatorForQuestion(question);

  renderAnswer(question);

  const baseTimer = session.config.timer || 0;
  startTimer(player.settings.extraTime && baseTimer ? Math.ceil(baseTimer * 1.5) : baseTimer);
}

function parseAnswerInput(raw, question) {
  const text = String(raw ?? '').trim();
  if (!text) return { empty: true, value: null };
  if (question.type === 'text') return { empty: false, value: text };
  if (text.includes('/')) {
    const [a, b] = text.split('/').map(Number);
    if (Number.isFinite(a) && Number.isFinite(b) && b !== 0) return { empty: false, value: a / b };
  }
  const value = Number(text);
  return { empty: !Number.isFinite(value), value };
}

function renderAnswer(question) {
  const area = $('answer-area');
  area.innerHTML = '';

  if (question.type === 'choice') {
    const choices = question.options.map((option, originalIndex) => ({ option, originalIndex }));
    if (question.randomizeOptions !== false) choices.sort(() => Math.random() - 0.5);
    choices.forEach(({ option, originalIndex }, index) => {
      const button = document.createElement('button');
      button.className = 'option lively-control';
      button.innerHTML = `<span class="option-key">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span>`;
      button.onclick = () => gradeAnswer(originalIndex, button);
      area.appendChild(button);
    });
    return;
  }

  const isText = question.type === 'text';
  area.innerHTML = `
    <div class="answer-input-row">
      <input id="answer-input" class="field" type="text" inputmode="${isText ? 'text' : 'decimal'}"
        placeholder="${isText ? 'Type your answer' : 'Type a number or fraction, e.g. 3/4'}">
      <button id="submit-answer" class="btn primary">Check</button>
    </div>`;

  const submit = () => {
    const parsed = parseAnswerInput($('answer-input').value, question);
    if (parsed.empty) { toast('Enter an answer first.'); $('answer-input').focus(); return; }
    gradeAnswer(parsed.value, $('submit-answer'));
  };
  $('submit-answer').onclick = submit;
  $('answer-input').onkeydown = event => { if (event.key === 'Enter') submit(); };
  $('answer-input').focus();
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

  const correct = isAnswerCorrect(question, value, timedOut);

  recordQuestionAttempt(player, question.id, correct);

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
      ${question.commonMistake ? `<p class="common-mistake"><strong>Common mistake:</strong> ${escapeHtml(question.commonMistake)}</p>` : ''}
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
  return recalculateTopicMastery({
    player,
    topicId,
    getTopicQuestions: id => {
      const topic = findTopic(id);
      return topic ? getTopicQuestions(topic) : [];
    }
  });
}

function getTopicMastery(id) {
  return readTopicMastery(player, id);
}


function calculatorUnlocks() {
  return getCalculatorUnlocks(player, getTopicMastery);
}

function allowedCalculatorMode(question) {
  return calculator.allowedMode(question);
}

function configureCalculatorForQuestion(question) {
  calculator.configureForQuestion(question);
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

    const utterance = new SpeechSynthesisUtterance($('question-text').textContent);
    utterance.rate = Number(player.settings.speechRate || 1);
    speechSynthesis.speak(utterance);
  }
};


let pausedTimeLeft = 0;
$('pause-btn').onclick = () => {
  if (session.answered) return;
  pausedTimeLeft = session.timeLeft;
  clearInterval(session.timer);
  $('pause-overlay').classList.remove('hidden');
};
$('resume-btn').onclick = () => {
  $('pause-overlay').classList.add('hidden');
  if (pausedTimeLeft > 0) startTimer(pausedTimeLeft);
};

function finishSession() {
  clearInterval(session.timer);

  const score = calculateSessionScore(session);

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
    submitTournamentScore(score, time);
  }

  if (session.mode === 'friend-challenge' && session.config.challengeId && socialService) {
    socialService.submitChallengeScore(session.config.challengeId, score, time)
      .then(() => toast('Challenge score submitted!'))
      .catch(error => {
        console.error(error);
        toast('Challenge score could not be submitted.');
      });
  }

  if (session.config.lessonId) {
    const lessonId = session.config.lessonId;
    const stars = calculateLessonStars(score, session.hearts);

    player.lessonBestScores[lessonId] = Math.max(
      score,
      player.lessonBestScores[lessonId] || 0
    );
    player.lessonStars[lessonId] = Math.max(
      stars,
      player.lessonStars[lessonId] || 0
    );
  }

  checkCourseCompletionRewards();
  addDailyActivity();
  savePlayer();

  appState.write({ viewId: 'result-view', activeQuiz: false });
  showView('result-view');
}


function checkCourseCompletionRewards() {
  for (const course of Object.values(COURSES)) {
    const complete = course.topics.every(topic => getTopicMastery(topic.id) >= 80);
    if (!complete || player.courseRewards[course.id]) continue;

    player.courseRewards[course.id] = true;
    player.xp += 250;
    player.points += 250;

    setTimeout(() => {
      modal(`
        <div class="course-complete">
          <div class="confirmation-icon">🎓</div>
          <p class="eyebrow">COURSE COMPLETE</p>
          <h2>${escapeHtml(course.title)} mastered!</h2>
          <p>You reached at least 80% mastery in every topic.</p>
          <div class="reward-row">
            <span class="reward-chip">⚡ +250 XP</span>
            <span class="reward-chip">🏅 Course badge unlocked</span>
          </div>
        </div>
      `);
    }, 350);
  }
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
      description: 'Clear all saved mistakes after making progress.',
      unlocked: player.completedLessons.length > 0 && player.mistakes.length === 0
    },
    {
      icon: '⭐',
      title: 'Perfect Lesson',
      description: 'Earn three stars in a lesson.',
      unlocked: Object.values(player.lessonStars || {}).some(stars => stars === 3)
    },
    {
      icon: '🎓',
      title: 'Course Graduate',
      description: 'Master every topic in a course.',
      unlocked: Object.keys(player.courseRewards || {}).length > 0
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
  if (!backendFlags.tournamentsEnabled) {
    $('start-tournament-btn').disabled = true;
    $('tournament-info').textContent = 'Weekly leagues are temporarily unavailable.';
    $('leaderboard-wrap').textContent = 'Please check again later.';
    return;
  }
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
    timer: Number($('timer-select').value),
    sound: $('sound-toggle').checked,
    reducedMotion: $('reduced-motion-toggle').checked,
    fontSize: $('font-size-select').value,
    highContrast: $('high-contrast-toggle').checked,
    extraTime: $('extra-time-toggle').checked,
    speechRate: Number($('speech-rate-select').value)
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
  if ($('app-version-copy')) $('app-version-copy').textContent = `STEM Quest v${APP_VERSION}`;
  if ($('backend-status-copy') && !firebaseEnabled) $('backend-status-copy').textContent = 'Local mode only';

  const accountType =
    firebaseUser
      ? 'Google account · Cloud saving enabled'
      : 'Local account · Saved on this device';

  $('profile-display-name').textContent =
    player.name || 'Learner';

  $('profile-avatar').textContent = player.avatar || DEFAULT_PLAYER.avatar;
  if ($('profile-bio-display')) {
    $('profile-bio-display').textContent = player.bio || 'No description added yet.';
  }
  if ($('profile-region-display')) {
    const visibleRegion = player.regionVisible && player.region !== 'hidden';
    $('profile-region-display').textContent = visibleRegion ? `📍 ${player.region}` : '📍 Region hidden';
  }

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

  if ($('profile-bio-input')) $('profile-bio-input').value = player.bio || '';
  if ($('profile-region-select')) $('profile-region-select').value = player.region || 'hidden';
  if ($('profile-region-visible')) $('profile-region-visible').checked = Boolean(player.regionVisible);

  $('profile-save-description').textContent =
    firebaseUser
      ? 'Your progress is synced through your Google account.'
      : 'Your progress is saved only in this browser on this device.';

  const unlocks = calculatorUnlocks();
  $('calculator-unlocks').innerHTML = [
    ['Basic', true, 'Available on approved arithmetic questions'],
    ['Scientific', unlocks.scientific, 'Unlock at 70% Division mastery'],
    ['Graphing', unlocks.graphing, 'Unlock at 70% Expanding brackets mastery']
  ].map(([name, unlocked, description]) => `
    <div class="unlock-card ${unlocked ? 'unlocked' : 'locked'}">
      <strong>${unlocked ? '✅' : '🔒'} ${name}</strong>
      <small>${escapeHtml(description)}</small>
    </div>
  `).join('');

  const contentSummary = $('content-health-summary');
  if (contentSummary) {
    const formattedReport = formatContentReport(CONTENT_REPORT);
    contentSummary.textContent = formattedReport.summary;
    contentSummary.className = `status-box content-${formattedReport.status}`;
  }

  applySettings();
  renderSocialPanel();
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
  player.bio = ($('profile-bio-input')?.value || '').trim().slice(0, 160);
  player.region = $('profile-region-select')?.value || 'hidden';
  player.regionVisible = Boolean($('profile-region-visible')?.checked) && player.region !== 'hidden';

  await savePlayer();
  await syncSocialProfile();

  renderProfile();
  renderHome();

  toast('Profile name saved.');
};



let socialDashboardLoading = false;

async function renderSocialPanel() {
  const panel = $('social-panel');
  if (!panel) return;

  if (!firebaseUser || !socialService) {
    panel.innerHTML = `
      <div class="status-box">Google sign-in is required for friends and challenges.</div>
    `;
    return;
  }

  if (socialDashboardLoading) return;
  socialDashboardLoading = true;
  panel.innerHTML = '<div class="status-box">Loading friends…</div>';

  try {
    const synced = await syncSocialProfile();
    const dashboard = await socialService.loadDashboard();
    const ownProfile = dashboard.profile || synced?.profile || {};
    const currentUid = firebaseUser.uid;

    const requestCards = dashboard.incoming.length
      ? dashboard.incoming.map(request => {
          const profile = dashboard.profiles[request.senderUid] || {};
          return `
            <div class="social-row">
              <div class="social-avatar">${escapeHtml(profile.avatar || '🧑‍🚀')}</div>
              <div class="grow"><strong>${escapeHtml(profile.displayName || 'Learner')}</strong><small>Sent you a friend request</small></div>
              <button class="btn primary" data-friend-response="accept" data-request-id="${escapeHtml(request.id)}">Accept</button>
              <button class="btn secondary" data-friend-response="reject" data-request-id="${escapeHtml(request.id)}">Reject</button>
            </div>`;
        }).join('')
      : '<p class="muted">No pending friend requests.</p>';

    const friendCards = dashboard.friendships.length
      ? dashboard.friendships.map(friendship => {
          const friendUid = friendship.participants.find(uid => uid !== currentUid);
          const profile = dashboard.profiles[friendUid] || {};
          return `
            <div class="social-row">
              <div class="social-avatar">${escapeHtml(profile.avatar || '🧑‍🚀')}</div>
              <div class="grow"><strong>${escapeHtml(profile.displayName || 'Learner')}</strong><small>Level ${Number(profile.level || 1)}</small></div>
              <button class="btn primary" data-challenge-friend="${escapeHtml(friendUid)}">Challenge</button>
              <button class="btn secondary" data-remove-friend="${escapeHtml(friendUid)}">Remove</button>
              <button class="btn danger" data-block-user="${escapeHtml(friendUid)}">Block</button>
            </div>`;
        }).join('')
      : '<p class="muted">Add a friend using their code to start challenging each other.</p>';

    const challengeCards = dashboard.challenges.length
      ? dashboard.challenges.map(challenge => {
          const otherUid = challenge.participants.find(uid => uid !== currentUid);
          const profile = dashboard.profiles[otherUid] || {};
          const ownScore = challenge.scores?.[currentUid];
          const otherScore = challenge.scores?.[otherUid];
          const incomingPending = challenge.status === 'pending' && challenge.opponentUid === currentUid;
          const playable = challenge.status === 'active' && !ownScore;
          let action = '';
          if (incomingPending) {
            action = `<button class="btn primary" data-challenge-response="accept" data-challenge-id="${challenge.id}">Accept</button><button class="btn secondary" data-challenge-response="decline" data-challenge-id="${challenge.id}">Decline</button>`;
          } else if (playable) {
            action = `<button class="btn primary" data-play-challenge="${challenge.id}">Play</button>`;
          } else if (ownScore) {
            action = `<span class="badge">Your score: ${ownScore.score}%</span>`;
          } else {
            action = `<span class="badge">${escapeHtml(challenge.status)}</span>`;
          }
          const result = challenge.status === 'complete' && ownScore && otherScore
            ? `<small>${ownScore.score > otherScore.score ? '🏆 You won' : ownScore.score < otherScore.score ? 'Good try — rematch anytime' : '🤝 Draw'} · ${ownScore.score}% vs ${otherScore.score}%</small>`
            : '<small>10 shared mixed questions</small>';
          return `<div class="social-row"><div class="social-avatar">⚔️</div><div class="grow"><strong>${escapeHtml(profile.displayName || 'Learner')}</strong>${result}</div>${action}</div>`;
        }).join('')
      : '<p class="muted">No challenges yet.</p>';

    panel.innerHTML = `
      <div class="friend-code-card">
        <div><small>Your private friend code</small><strong id="friend-code-copy">${escapeHtml(ownProfile.friendCode || 'Creating…')}</strong></div>
        <p class="tiny muted">Share this code only with people you know. It does not reveal your email.</p>
      </div>
      <div class="social-add-row">
        <input id="friend-code-input" class="field" maxlength="12" autocomplete="off" placeholder="Enter friend code">
        <button id="send-friend-request-btn" class="btn primary">Add friend</button>
      </div>
      <h3>Requests</h3><div class="social-list">${requestCards}</div>
      <h3>Friends</h3><div class="social-list">${friendCards}</div>
      <h3>Challenges</h3><div class="social-list">${challengeCards}</div>
    `;

    $('send-friend-request-btn').onclick = async () => {
      const code = $('friend-code-input').value.trim().toUpperCase();
      if (!code) return toast('Enter a friend code first.');
      try {
        await socialService.sendFriendRequest(code);
        toast('Friend request sent!');
        renderSocialPanel();
      } catch (error) {
        console.error(error);
        toast(error?.message?.replace('FirebaseError: ', '') || 'Friend request failed.');
      }
    };

    document.querySelectorAll('[data-friend-response]').forEach(button => {
      button.onclick = async () => {
        try {
          await socialService.respondFriendRequest(button.dataset.requestId, button.dataset.friendResponse);
          toast(button.dataset.friendResponse === 'accept' ? 'Friend added!' : 'Request rejected.');
          renderSocialPanel();
        } catch (error) { console.error(error); toast('Could not update request.'); }
      };
    });

    document.querySelectorAll('[data-challenge-friend]').forEach(button => {
      button.onclick = async () => {
        try {
          await socialService.createChallenge(button.dataset.challengeFriend);
          toast('Challenge invitation sent!');
          renderSocialPanel();
        } catch (error) { console.error(error); toast('Could not create challenge.'); }
      };
    });

    document.querySelectorAll('[data-challenge-response]').forEach(button => {
      button.onclick = async () => {
        try {
          await socialService.respondChallenge(button.dataset.challengeId, button.dataset.challengeResponse);
          toast(button.dataset.challengeResponse === 'accept' ? 'Challenge accepted!' : 'Challenge declined.');
          renderSocialPanel();
        } catch (error) { console.error(error); toast('Could not update challenge.'); }
      };
    });

    document.querySelectorAll('[data-play-challenge]').forEach(button => {
      button.onclick = () => {
        startSession({
          mode: 'friend-challenge',
          challengeId: button.dataset.playChallenge,
          questions: seededShuffle(allQuestions(), button.dataset.playChallenge).slice(0, 10),
          timer: 45
        });
      };
    });

    document.querySelectorAll('[data-remove-friend]').forEach(button => {
      button.onclick = async () => {
        if (!confirm('Remove this friend?')) return;
        try { await socialService.removeFriend(button.dataset.removeFriend); toast('Friend removed.'); renderSocialPanel(); }
        catch (error) { console.error(error); toast('Could not remove friend.'); }
      };
    });

    document.querySelectorAll('[data-block-user]').forEach(button => {
      button.onclick = async () => {
        if (!confirm('Block this learner? This also removes the friendship.')) return;
        try { await socialService.blockUser(button.dataset.blockUser); toast('Learner blocked.'); renderSocialPanel(); }
        catch (error) { console.error(error); toast('Could not block learner.'); }
      };
    });
  } catch (error) {
    console.error(error);
    panel.innerHTML = `
      <div class="status-box content-error">
        Friends backend is not ready yet. Deploy Cloud Functions and Firestore indexes, then refresh.
      </div>`;
  } finally {
    socialDashboardLoading = false;
  }
}

const PROFILE_AVATARS = [
  '🧑‍🚀', '🧙', '🦉', '🤖', '🐼', '🐯',
  '🦊', '🐸', '🐙', '🦄', '🐲', '🌟'
];

if ($('edit-avatar-btn')) {
  $('edit-avatar-btn').onclick = () => {
    modal(`
      <div class="avatar-picker-modal">
        <p class="eyebrow">PROFILE PICTURE</p>
        <h2>Choose your avatar</h2>
        <p class="muted">You can change this at any time.</p>
        <div class="avatar-choice-grid">
          ${PROFILE_AVATARS.map(avatar => `
            <button class="avatar-choice ${avatar === player.avatar ? 'selected' : ''}" data-avatar-choice="${avatar}" aria-label="Choose ${avatar}">${avatar}</button>
          `).join('')}
        </div>
      </div>
    `);

    document.querySelectorAll('[data-avatar-choice]').forEach(button => {
      button.onclick = async () => {
        player.avatar = button.dataset.avatarChoice;
        await savePlayer();
        await syncSocialProfile();
        closeAppModal();
        syncUI();
        renderProfile();
        renderHome();
        toast('Profile picture updated.');
      };
    });
  };
}

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
    appState.clear();
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



$('report-question-btn').onclick = () => {
  const question = session.questions?.[session.index];
  const topic = question ? findTopic(question.topicId) : null;
  modal(`
    <p class="eyebrow">REPORT A QUESTION</p>
    <h2>What went wrong?</h2>
    <div class="report-context"><strong>${escapeHtml(question?.id || 'Unknown question')}</strong><br>${escapeHtml(topic?.title || 'Mixed review')}</div>
    <label class="setting-field">Category
      <select id="quick-report-category" class="field">
        <option value="incorrect-question">Question or answer is incorrect</option>
        <option value="confusing-explanation">Explanation is confusing</option>
        <option value="technical-issue">Something is broken</option>
        <option value="accessibility">Accessibility problem</option>
      </select>
    </label>
    <textarea id="quick-report-message" class="field feedback-textarea" maxlength="1000" placeholder="Describe the problem…"></textarea>
    <button id="send-quick-report-btn" class="btn primary wide">Send report</button>
  `);
  $('send-quick-report-btn').onclick = async () => {
    const message = $('quick-report-message').value.trim();
    if (message.length < 10) { toast('Please add a little more detail.'); return; }
    const report = {
      category: $('quick-report-category').value,
      message,
      userId: firebaseUser?.uid || null,
      displayName: player.name || 'Learner',
      questionId: question?.id || null,
      lessonId: question?.lessonId || null,
      topicId: question?.topicId || null,
      courseId: question?.courseId || null,
      appVersion: APP_VERSION,
      page: 'game-view',
      createdAtLocal: Date.now()
    };
    try {
      if (firebaseUser && db) {
        await addDoc(collection(db, 'feedback'), { ...report, createdAt: serverTimestamp() });
      } else {
        const localReports = JSON.parse(localStorage.getItem('stemQuestFeedback') || '[]');
        localReports.push(report);
        localStorage.setItem('stemQuestFeedback', JSON.stringify(localReports.slice(-50)));
      }
      backendService?.track('question_reported', { category: report.category, question_id: report.questionId || 'unknown' });
      closeAppModal();
      toast(firebaseUser ? 'Report sent. Thank you!' : 'Report saved on this device.');
    } catch (error) {
      console.error(error);
      toast('The report could not be sent.');
    }
  };
};

$('submit-feedback-btn').onclick = async () => {
  const category = $('feedback-category').value;
  const message = $('feedback-message').value.trim();

  if (message.length < 10) {
    toast('Please add a little more detail before sending.');
    return;
  }

  const report = {
    category,
    message,
    userId: firebaseUser?.uid || null,
    displayName: player.name || 'Learner',
    questionId: session.questions?.[session.index]?.id || null,
    page: document.querySelector('.view.active')?.id || 'unknown',
    appVersion: APP_VERSION,
    createdAtLocal: Date.now()
  };

  try {
    if (firebaseUser && db) {
      await addDoc(collection(db, 'feedback'), {
        ...report,
        createdAt: serverTimestamp()
      });
    } else {
      const localReports = JSON.parse(localStorage.getItem('stemQuestFeedback') || '[]');
      localReports.push(report);
      localStorage.setItem('stemQuestFeedback', JSON.stringify(localReports.slice(-50)));
    }

    $('feedback-message').value = '';
    toast(firebaseUser ? 'Feedback sent. Thank you!' : 'Feedback saved on this device.');
  } catch (error) {
    console.error(error);
    toast('Feedback could not be sent. Please try again.');
  }
};

$('theme-select').onchange = () => {
  player.settings.theme =
    $('theme-select').value;

  applySettings();
};

function applySettings() {
  const themeClasses = ['theme-ocean', 'theme-night', 'theme-light'];
  document.body.classList.remove(...themeClasses);
  if (player.settings.theme && player.settings.theme !== 'quest') {
    document.body.classList.add(`theme-${player.settings.theme}`);
  }
  document.body.classList.toggle('reduced-motion', Boolean(player.settings.reducedMotion));
  document.body.classList.toggle('high-contrast', Boolean(player.settings.highContrast));
  document.body.dataset.fontSize = player.settings.fontSize || 'normal';

  $('theme-select').value = player.settings.theme || 'quest';
  $('timer-select').value = String(player.settings.timer || 0);
  $('sound-toggle').checked = player.settings.sound !== false;
  $('reduced-motion-toggle').checked = Boolean(player.settings.reducedMotion);
  $('font-size-select').value = player.settings.fontSize || 'normal';
  $('high-contrast-toggle').checked = Boolean(player.settings.highContrast);
  $('extra-time-toggle').checked = Boolean(player.settings.extraTime);
  $('speech-rate-select').value = String(player.settings.speechRate || 1);
}

const scratchpad = createScratchpad({ $ });

const calculator = createCalculator({
  $,
  getUnlocks: calculatorUnlocks,
  toast
});


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



const developerTools = createDeveloperTools({
  courses: COURSES,
  contentReport: CONTENT_REPORT,
  getPlayer: () => player,
  savePlayer,
  jumpToTopic(courseId, topicId) {
    selectedCourseId = courseId;
    selectedTopicId = topicId;
    renderTopic();
    showView('topic-view');
  },
  jumpToLesson(courseId, topicId, lessonId) {
    selectedCourseId = courseId;
    selectedTopicId = topicId;
    selectedLessonId = lessonId;
    lessonPageIndex = 0;
    renderLessonPage();
    showView('lesson-view');
  },
  showView,
  toast,
  refreshHome() {
    renderHome();
    syncUI();
  }
});

window.addEventListener('beforeunload', event => {
  const activeView = document.querySelector('.view.active')?.id;

  saveService.saveLocalImmediately(
    JSON.parse(JSON.stringify(player))
  );

  if (activeView === 'game-view' && !session.answered) {
    event.preventDefault();
    event.returnValue = '';
  }
});

window.addEventListener('pagehide', () => {
  saveService.saveLocalImmediately(
    JSON.parse(JSON.stringify(player))
  );
});

syncUI();
