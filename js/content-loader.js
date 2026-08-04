import { validateContent } from './content-validator.js';

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach(deepFreeze);
  return value;
}

function normalizeLegacyCourses(legacyCourses) {
  const courses = structuredClone(legacyCourses || {});

  for (const course of Object.values(courses)) {
    course.topics ||= [];
    for (const topic of course.topics) {
      topic.lessons ||= [];
      for (const lesson of topic.lessons) {
        lesson.pages ||= [];
        lesson.questions ||= [];
        for (const question of lesson.questions) {
          question.lessonId ||= lesson.id;
          question.calculatorMode ||= question.calculatorAllowed ? 'basic' : 'none';
          question.tolerance ??= 0;
          question.xp ??= 10;
          question.steps ||= [];
          question.hint ||= '';
        }
      }
    }
  }

  return courses;
}

export function loadContent(options = {}) {
  const {
    freeze = true,
    blockOnErrors = true,
    source = window.STEM_COURSES
  } = options;

  if (!source || typeof source !== 'object') {
    throw new Error('No STEM content was loaded. Make sure course-data.js is included before app.js.');
  }

  const courses = normalizeLegacyCourses(source);
  const report = validateContent(courses);

  console.groupCollapsed(
    report.valid
      ? `STEM content validated: ${report.counts.questions} questions`
      : `STEM content errors: ${report.errors.length}`
  );
  console.table(report.issues);
  console.groupEnd();

  if (blockOnErrors && !report.valid) {
    const firstErrors = report.errors.slice(0, 5).map(item => `• ${item.message}`).join('\n');
    throw new Error(`Content validation failed.\n${firstErrors}`);
  }

  return {
    courses: freeze ? deepFreeze(courses) : courses,
    report
  };
}

export function formatContentReport(report) {
  const { courses, topics, lessons, questions } = report.counts;
  return `${courses} courses · ${topics} topics · ${lessons} lessons · ${questions} questions · ${report.errors.length} errors · ${report.warnings.length} warnings`;
}
