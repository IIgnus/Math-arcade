const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const friendshipId = (a, b) => [a, b].sort().join('_');
const blockId = (ownerUid, targetUid) => `${ownerUid}_${targetUid}`;

function requireAuth(request) {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in first.');
  return request.auth.uid;
}

function cleanText(value, max) {
  return String(value || '').trim().slice(0, max);
}

function makeCode(length = 8) {
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

async function writePublicProfile(uid, profile, existing = {}) {
  const displayName = cleanText(profile?.displayName || existing.displayName || 'Learner', 24);
  if (displayName.length < 2) throw new HttpsError('invalid-argument', 'Display name is too short.');

  const data = {
    uid,
    displayName,
    avatar: cleanText(profile?.avatar || existing.avatar || '🧑‍🚀', 12),
    level: Math.max(1, Math.floor(Number(profile?.level || existing.level || 1))),
    region: cleanText(profile?.region || existing.region || 'hidden', 40),
    regionVisible: Boolean(profile?.regionVisible),
    friendCode: existing.friendCode || null,
    updatedAt: FieldValue.serverTimestamp()
  };

  await db.collection('publicProfiles').doc(uid).set(data, { merge: true });
  return data;
}

exports.ensureSocialProfile = onCall(async request => {
  const uid = requireAuth(request);
  const profileRef = db.collection('publicProfiles').doc(uid);
  const profileSnap = await profileRef.get();
  const existing = profileSnap.exists ? profileSnap.data() : {};

  let friendCode = existing.friendCode;
  if (!friendCode) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const candidate = makeCode();
      const codeRef = db.collection('friendCodes').doc(candidate);
      const created = await db.runTransaction(async transaction => {
        const codeSnap = await transaction.get(codeRef);
        if (codeSnap.exists) return false;
        transaction.create(codeRef, {
          uid,
          createdAt: FieldValue.serverTimestamp()
        });
        transaction.set(profileRef, { friendCode: candidate }, { merge: true });
        return true;
      });
      if (created) {
        friendCode = candidate;
        break;
      }
    }
  }

  if (!friendCode) throw new HttpsError('resource-exhausted', 'Could not generate a friend code.');
  const data = await writePublicProfile(uid, request.data?.profile, { ...existing, friendCode });
  return { friendCode, profile: { ...data, friendCode } };
});

exports.sendFriendRequest = onCall(async request => {
  const senderUid = requireAuth(request);
  const friendCode = cleanText(request.data?.friendCode, 12).toUpperCase();
  if (!friendCode) throw new HttpsError('invalid-argument', 'Enter a friend code.');

  const codeSnap = await db.collection('friendCodes').doc(friendCode).get();
  if (!codeSnap.exists) throw new HttpsError('not-found', 'Friend code not found.');
  const recipientUid = codeSnap.data().uid;
  if (recipientUid === senderUid) throw new HttpsError('invalid-argument', 'You cannot add yourself.');

  const [blockedBySender, blockedByRecipient, friendshipSnap] = await Promise.all([
    db.collection('blocks').doc(blockId(senderUid, recipientUid)).get(),
    db.collection('blocks').doc(blockId(recipientUid, senderUid)).get(),
    db.collection('friendships').doc(friendshipId(senderUid, recipientUid)).get()
  ]);
  if (blockedBySender.exists || blockedByRecipient.exists) throw new HttpsError('permission-denied', 'This friend request cannot be sent.');
  if (friendshipSnap.exists) throw new HttpsError('already-exists', 'You are already friends.');

  const requestId = `${senderUid}_${recipientUid}`;
  await db.collection('friendRequests').doc(requestId).set({
    senderUid,
    recipientUid,
    participants: [senderUid, recipientUid],
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });

  return { requestId };
});

exports.respondFriendRequest = onCall(async request => {
  const uid = requireAuth(request);
  const requestId = cleanText(request.data?.requestId, 180);
  const action = cleanText(request.data?.action, 12);
  if (!['accept', 'reject'].includes(action)) throw new HttpsError('invalid-argument', 'Invalid action.');

  const requestRef = db.collection('friendRequests').doc(requestId);
  await db.runTransaction(async transaction => {
    const snap = await transaction.get(requestRef);
    if (!snap.exists) throw new HttpsError('not-found', 'Friend request not found.');
    const data = snap.data();
    if (data.recipientUid !== uid) throw new HttpsError('permission-denied', 'This request is not yours.');
    if (data.status !== 'pending') throw new HttpsError('failed-precondition', 'This request was already handled.');

    transaction.update(requestRef, {
      status: action === 'accept' ? 'accepted' : 'rejected',
      updatedAt: FieldValue.serverTimestamp()
    });

    if (action === 'accept') {
      const id = friendshipId(data.senderUid, data.recipientUid);
      transaction.set(db.collection('friendships').doc(id), {
        participants: [data.senderUid, data.recipientUid].sort(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    }
  });
  return { ok: true };
});

exports.removeFriend = onCall(async request => {
  const uid = requireAuth(request);
  const friendUid = cleanText(request.data?.friendUid, 128);
  if (!friendUid || friendUid === uid) throw new HttpsError('invalid-argument', 'Invalid friend.');
  await db.collection('friendships').doc(friendshipId(uid, friendUid)).delete();
  return { ok: true };
});

exports.blockUser = onCall(async request => {
  const uid = requireAuth(request);
  const targetUid = cleanText(request.data?.targetUid, 128);
  if (!targetUid || targetUid === uid) throw new HttpsError('invalid-argument', 'Invalid learner.');

  const batch = db.batch();
  batch.set(db.collection('blocks').doc(blockId(uid, targetUid)), {
    ownerUid: uid,
    targetUid,
    createdAt: FieldValue.serverTimestamp()
  });
  batch.delete(db.collection('friendships').doc(friendshipId(uid, targetUid)));
  batch.delete(db.collection('friendRequests').doc(`${uid}_${targetUid}`));
  batch.delete(db.collection('friendRequests').doc(`${targetUid}_${uid}`));
  await batch.commit();
  return { ok: true };
});

exports.createChallenge = onCall(async request => {
  const creatorUid = requireAuth(request);
  const opponentUid = cleanText(request.data?.opponentUid, 128);
  const questionSetId = cleanText(request.data?.questionSetId || 'weekly-mixed', 80);
  if (!opponentUid || opponentUid === creatorUid) throw new HttpsError('invalid-argument', 'Choose another learner.');

  const friendshipSnap = await db.collection('friendships').doc(friendshipId(creatorUid, opponentUid)).get();
  if (!friendshipSnap.exists) throw new HttpsError('permission-denied', 'Challenges can only be sent to friends.');

  const ref = await db.collection('challenges').add({
    creatorUid,
    opponentUid,
    participants: [creatorUid, opponentUid].sort(),
    questionSetId,
    status: 'pending',
    scores: {},
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });
  return { challengeId: ref.id };
});

exports.respondChallenge = onCall(async request => {
  const uid = requireAuth(request);
  const challengeId = cleanText(request.data?.challengeId, 180);
  const action = cleanText(request.data?.action, 12);
  if (!['accept', 'decline'].includes(action)) throw new HttpsError('invalid-argument', 'Invalid action.');

  const ref = db.collection('challenges').doc(challengeId);
  await db.runTransaction(async transaction => {
    const snap = await transaction.get(ref);
    if (!snap.exists) throw new HttpsError('not-found', 'Challenge not found.');
    const data = snap.data();
    if (data.opponentUid !== uid) throw new HttpsError('permission-denied', 'This challenge is not yours.');
    if (data.status !== 'pending') throw new HttpsError('failed-precondition', 'Challenge already handled.');
    transaction.update(ref, {
      status: action === 'accept' ? 'active' : 'declined',
      updatedAt: FieldValue.serverTimestamp()
    });
  });
  return { ok: true };
});

exports.submitChallengeScore = onCall(async request => {
  const uid = requireAuth(request);
  const challengeId = cleanText(request.data?.challengeId, 180);
  const score = Number(request.data?.score);
  const time = Number(request.data?.time);
  if (!challengeId || !Number.isFinite(score) || score < 0 || score > 100 || !Number.isFinite(time) || time < 0 || time > 7200) {
    throw new HttpsError('invalid-argument', 'Invalid challenge result.');
  }

  const ref = db.collection('challenges').doc(challengeId);
  await db.runTransaction(async transaction => {
    const snap = await transaction.get(ref);
    if (!snap.exists) throw new HttpsError('not-found', 'Challenge not found.');
    const data = snap.data();
    if (!data.participants.includes(uid)) throw new HttpsError('permission-denied', 'Not a participant.');
    if (!['active', 'complete'].includes(data.status)) throw new HttpsError('failed-precondition', 'Challenge is not active.');
    if (data.scores?.[uid]) throw new HttpsError('already-exists', 'Your result was already submitted.');

    const scores = {
      ...(data.scores || {}),
      [uid]: { score, time, submittedAt: new Date() }
    };
    transaction.update(ref, {
      scores,
      status: Object.keys(scores).length >= 2 ? 'complete' : 'active',
      updatedAt: FieldValue.serverTimestamp()
    });
  });
  return { ok: true };
});
