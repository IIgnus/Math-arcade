const VALID_QUESTION_TYPES = new Set(['choice', 'number', 'text']);
const VALID_CALCULATOR_MODES = new Set(['none', 'basic', 'scientific', 'graphing']);

function issue(level, code, message, location = '') {
  return { level, code, message, location };
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateNestedCourses(courses) {
  const issues = [];
  const ids = {
    courses: new Set(),
    topics: new Set(),
    lessons: new Set(),
    questions: new Set()
  };

  const courseEntries = Object.entries(courses || {});
  if (!courseEntries.length) {
    issues.push(issue('error', 'NO_COURSES', 'No courses were found in the content file.'));
  }

  for (const [courseKey, course] of courseEntries) {
    const courseLocation = `course:${courseKey}`;
    const courseId = course?.id || courseKey;

    if (!isNonEmptyString(courseId)) {
      issues.push(issue('error', 'COURSE_ID_MISSING', 'A course is missing a valid ID.', courseLocation));
      continue;
    }
    if (ids.courses.has(courseId)) {
      issues.push(issue('error', 'COURSE_ID_DUPLICATE', `Duplicate course ID "${courseId}".`, courseLocation));
    }
    ids.courses.add(courseId);

    if (!isNonEmptyString(course?.title)) {
      issues.push(issue('error', 'COURSE_TITLE_MISSING', `Course "${courseId}" has no title.`, courseLocation));
    }
    if (!Array.isArray(course?.topics) || course.topics.length === 0) {
      issues.push(issue('warning', 'COURSE_TOPICS_EMPTY', `Course "${courseId}" contains no topics.`, courseLocation));
      continue;
    }

    for (const topic of course.topics) {
      const topicId = topic?.id;
      const topicLocation = `${courseLocation}/topic:${topicId || 'unknown'}`;

      if (!isNonEmptyString(topicId)) {
        issues.push(issue('error', 'TOPIC_ID_MISSING', `A topic in course "${courseId}" is missing an ID.`, topicLocation));
        continue;
      }
      if (ids.topics.has(topicId)) {
        issues.push(issue('error', 'TOPIC_ID_DUPLICATE', `Duplicate topic ID "${topicId}".`, topicLocation));
      }
      ids.topics.add(topicId);

      if (!isNonEmptyString(topic?.title)) {
        issues.push(issue('error', 'TOPIC_TITLE_MISSING', `Topic "${topicId}" has no title.`, topicLocation));
      }
      if (topic?.prerequisite && !course.topics.some(item => item.id === topic.prerequisite)) {
        issues.push(issue('error', 'TOPIC_PREREQUISITE_MISSING', `Topic "${topicId}" references missing prerequisite "${topic.prerequisite}".`, topicLocation));
      }
      if (!Array.isArray(topic?.lessons) || topic.lessons.length === 0) {
        issues.push(issue('warning', 'TOPIC_LESSONS_EMPTY', `Topic "${topicId}" contains no lessons.`, topicLocation));
        continue;
      }

      for (const lesson of topic.lessons) {
        const lessonId = lesson?.id;
        const lessonLocation = `${topicLocation}/lesson:${lessonId || 'unknown'}`;

        if (!isNonEmptyString(lessonId)) {
          issues.push(issue('error', 'LESSON_ID_MISSING', `A lesson in topic "${topicId}" is missing an ID.`, lessonLocation));
          continue;
        }
        if (ids.lessons.has(lessonId)) {
          issues.push(issue('error', 'LESSON_ID_DUPLICATE', `Duplicate lesson ID "${lessonId}".`, lessonLocation));
        }
        ids.lessons.add(lessonId);

        if (!isNonEmptyString(lesson?.title)) {
          issues.push(issue('error', 'LESSON_TITLE_MISSING', `Lesson "${lessonId}" has no title.`, lessonLocation));
        }
        if (!Array.isArray(lesson?.pages) || lesson.pages.length === 0) {
          issues.push(issue('warning', 'LESSON_PAGES_EMPTY', `Lesson "${lessonId}" contains no learning pages.`, lessonLocation));
        } else {
          lesson.pages.forEach((page, pageIndex) => {
            const pageLocation = `${lessonLocation}/page:${pageIndex + 1}`;
            if (!isNonEmptyString(page?.title)) {
              issues.push(issue('warning', 'PAGE_TITLE_MISSING', `Page ${pageIndex + 1} in lesson "${lessonId}" has no title.`, pageLocation));
            }
            if (!isNonEmptyString(page?.body)) {
              issues.push(issue('error', 'PAGE_BODY_MISSING', `Page ${pageIndex + 1} in lesson "${lessonId}" has no explanation text.`, pageLocation));
            }
          });
        }

        if (!Array.isArray(lesson?.questions) || lesson.questions.length === 0) {
          issues.push(issue('warning', 'LESSON_QUESTIONS_EMPTY', `Lesson "${lessonId}" contains no questions.`, lessonLocation));
          continue;
        }

        for (const question of lesson.questions) {
          const questionId = question?.id;
          const questionLocation = `${lessonLocation}/question:${questionId || 'unknown'}`;

          if (!isNonEmptyString(questionId)) {
            issues.push(issue('error', 'QUESTION_ID_MISSING', `A question in lesson "${lessonId}" is missing an ID.`, questionLocation));
            continue;
          }
          if (ids.questions.has(questionId)) {
            issues.push(issue('error', 'QUESTION_ID_DUPLICATE', `Duplicate question ID "${questionId}".`, questionLocation));
          }
          ids.questions.add(questionId);

          if (!isNonEmptyString(question?.prompt)) {
            issues.push(issue('error', 'QUESTION_PROMPT_MISSING', `Question "${questionId}" has no prompt.`, questionLocation));
          }
          if (!VALID_QUESTION_TYPES.has(question?.type)) {
            issues.push(issue('error', 'QUESTION_TYPE_INVALID', `Question "${questionId}" has unsupported type "${question?.type}".`, questionLocation));
          }

          if (question?.type === 'choice') {
            if (!Array.isArray(question.options) || question.options.length < 2) {
              issues.push(issue('error', 'QUESTION_OPTIONS_INVALID', `Choice question "${questionId}" must have at least two options.`, questionLocation));
            }
            if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= (question.options?.length || 0)) {
              issues.push(issue('error', 'QUESTION_ANSWER_INDEX_INVALID', `Choice question "${questionId}" has an invalid correct-answer index.`, questionLocation));
            }
          } else if (question?.type === 'number') {
            if (typeof question.answer !== 'number' || !Number.isFinite(question.answer)) {
              issues.push(issue('error', 'QUESTION_NUMERIC_ANSWER_INVALID', `Number question "${questionId}" must have a finite numeric answer.`, questionLocation));
            }
            if (question.tolerance != null && (typeof question.tolerance !== 'number' || question.tolerance < 0)) {
              issues.push(issue('error', 'QUESTION_TOLERANCE_INVALID', `Question "${questionId}" has an invalid tolerance.`, questionLocation));
            }
          }

          if (!isNonEmptyString(question?.hint)) {
            issues.push(issue('warning', 'QUESTION_HINT_MISSING', `Question "${questionId}" has no hint.`, questionLocation));
          }
          if (!Array.isArray(question?.steps) || question.steps.length === 0) {
            issues.push(issue('warning', 'QUESTION_STEPS_MISSING', `Question "${questionId}" has no worked-solution steps.`, questionLocation));
          }

          const mode = question?.calculatorMode ?? (question?.calculatorAllowed ? 'basic' : 'none');
          if (!VALID_CALCULATOR_MODES.has(mode)) {
            issues.push(issue('error', 'QUESTION_CALCULATOR_MODE_INVALID', `Question "${questionId}" has invalid calculator mode "${mode}".`, questionLocation));
          }
        }
      }
    }
  }

  return {
    format: 'nested-v1',
    issues,
    counts: {
      courses: ids.courses.size,
      topics: ids.topics.size,
      lessons: ids.lessons.size,
      questions: ids.questions.size
    }
  };
}

export function validateContent(courses) {
  const report = validateNestedCourses(courses);
  report.errors = report.issues.filter(item => item.level === 'error');
  report.warnings = report.issues.filter(item => item.level === 'warning');
  report.valid = report.errors.length === 0;
  return report;
}
