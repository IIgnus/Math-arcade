export function createQuizSession(config = {}) {
  return {
    mode: config.mode || 'practice',
    questions: [...(config.questions || [])],
    index: 0,
    correct: 0,
    hearts: 5,
    answered: false,
    startTime: Date.now(),
    timer: null,
    timeLeft: 0,
    config: {
      ...config,
      questions: [...(config.questions || [])]
    }
  };
}

export function isAnswerCorrect(question, value, timedOut = false) {
  if (timedOut) return false;

  if (question.type === 'choice') {
    return value === question.answer;
  }

  if (question.type === 'text') {
    const accepted = question.acceptedAnswers || [question.answer];
    const normalised = String(value ?? '').trim().toLowerCase();
    return accepted.some(answer => String(answer).trim().toLowerCase() === normalised);
  }

  const tolerance = Number(question.tolerance || 0);
  const accepted = Array.isArray(question.acceptedAnswers)
    ? question.acceptedAnswers
    : [question.answer];
  return Number.isFinite(value) && accepted.some(answer => {
    const numeric = Number(answer);
    return Number.isFinite(numeric) && Math.abs(value - numeric) <= tolerance;
  });
}

export function recordQuestionAttempt(player, questionId, correct) {
  player.attempts ||= {};

  const attempt = player.attempts[questionId] || {
    total: 0,
    correct: 0,
    recent: []
  };

  attempt.total++;
  if (correct) attempt.correct++;
  attempt.recent = [...(attempt.recent || []), correct].slice(-5);
  player.attempts[questionId] = attempt;

  return attempt;
}

export function calculateSessionScore(session) {
  const total = session.questions.length;
  return total ? Math.round((session.correct / total) * 100) : 0;
}
