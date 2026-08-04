export function getTopicMastery(player, topicId) {
  return Math.round(player?.mastery?.[topicId] || 0);
}

export function updateTopicMastery({ player, topicId, getTopicQuestions }) {
  if (!topicId) return 0;

  const questions = getTopicQuestions(topicId) || [];
  let weightedTotal = 0;
  let questionCount = 0;

  for (const question of questions) {
    const attempt = player.attempts?.[question.id];
    if (!attempt || !attempt.total) continue;

    const lifetimeAccuracy = attempt.correct / attempt.total;
    const recent = attempt.recent || [];
    const recentAccuracy = recent.filter(Boolean).length / Math.max(1, recent.length);

    weightedTotal += recentAccuracy * 0.7 + lifetimeAccuracy * 0.3;
    questionCount++;
  }

  const mastery = questionCount
    ? Math.round((weightedTotal / questionCount) * 100)
    : 0;

  player.mastery ||= {};
  player.completedTopics ||= [];
  player.mastery[topicId] = mastery;

  if (mastery >= 80 && !player.completedTopics.includes(topicId)) {
    player.completedTopics.push(topicId);
  }

  return mastery;
}

export function isTopicUnlocked(player, topic, getMastery) {
  if (!topic) return false;
  if (!topic.prerequisite) return true;
  if (player.placementCompleted) return true;
  return getMastery(topic.prerequisite) >= 70;
}

export function isLessonUnlocked(player, topic, index) {
  if (index === 0 || player.placementCompleted) return true;
  return player.completedLessons.includes(topic.lessons[index - 1].id);
}

export function calculateLessonStars(score, heartsRemaining) {
  if (score === 100 && heartsRemaining === 5) return 3;
  if (score >= 80) return 2;
  if (score >= 60) return 1;
  return 0;
}

export function calculatorUnlocks(player, getMastery) {
  return {
    basic: true,
    scientific: getMastery('division') >= 70 || player.placementCompleted,
    graphing: getMastery('expanding') >= 70 || player.placementCompleted
  };
}

