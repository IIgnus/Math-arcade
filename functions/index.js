const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

exports.createChallenge = onCall(async request => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in first.');
  const opponentUid = String(request.data?.opponentUid || '').trim();
  if (!opponentUid || opponentUid === request.auth.uid) {
    throw new HttpsError('invalid-argument', 'Choose another learner.');
  }
  const challenge = {
    creatorUid: request.auth.uid,
    opponentUid,
    participants: [request.auth.uid, opponentUid],
    status: 'pending',
    scores: {},
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  };
  const ref = await db.collection('challenges').add(challenge);
  return { challengeId: ref.id };
});

exports.submitChallengeScore = onCall(async request => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in first.');
  const challengeId = String(request.data?.challengeId || '');
  const score = Number(request.data?.score);
  const time = Number(request.data?.time);
  if (!challengeId || !Number.isFinite(score) || score < 0 || score > 100 || !Number.isFinite(time) || time < 0) {
    throw new HttpsError('invalid-argument', 'Invalid challenge result.');
  }
  const ref = db.collection('challenges').doc(challengeId);
  await db.runTransaction(async transaction => {
    const snap = await transaction.get(ref);
    if (!snap.exists) throw new HttpsError('not-found', 'Challenge not found.');
    const data = snap.data();
    if (!data.participants.includes(request.auth.uid)) throw new HttpsError('permission-denied', 'Not a participant.');
    transaction.update(ref, {
      [`scores.${request.auth.uid}`]: { score, time, submittedAt: new Date() },
      status: Object.keys(data.scores || {}).length >= 1 ? 'complete' : 'active',
      updatedAt: FieldValue.serverTimestamp()
    });
  });
  return { ok: true };
});
