import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import {
  getFunctions,
  httpsCallable
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js';

export function createSocialService({ app, db, getUser }) {
  const functions = getFunctions(app);
  const call = name => httpsCallable(functions, name);

  const ensureSocialProfileCall = call('ensureSocialProfile');
  const sendFriendRequestCall = call('sendFriendRequest');
  const respondFriendRequestCall = call('respondFriendRequest');
  const removeFriendCall = call('removeFriend');
  const blockUserCall = call('blockUser');
  const createChallengeCall = call('createChallenge');
  const respondChallengeCall = call('respondChallenge');
  const submitChallengeScoreCall = call('submitChallengeScore');

  function requireUser() {
    const user = getUser();
    if (!user) throw new Error('Google sign-in is required.');
    return user;
  }

  async function ensureProfile(profile) {
    requireUser();
    const result = await ensureSocialProfileCall({ profile });
    return result.data;
  }

  async function loadDashboard() {
    const user = requireUser();
    const profileSnap = await getDoc(doc(db, 'publicProfiles', user.uid));

    const [incomingSnap, friendshipsSnap, challengesSnap] = await Promise.all([
      getDocs(query(
        collection(db, 'friendRequests'),
        where('recipientUid', '==', user.uid),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc'),
        limit(20)
      )),
      getDocs(query(
        collection(db, 'friendships'),
        where('participants', 'array-contains', user.uid),
        orderBy('updatedAt', 'desc'),
        limit(50)
      )),
      getDocs(query(
        collection(db, 'challenges'),
        where('participants', 'array-contains', user.uid),
        orderBy('updatedAt', 'desc'),
        limit(30)
      ))
    ]);

    const incoming = incomingSnap.docs.map(item => ({ id: item.id, ...item.data() }));
    const friendships = friendshipsSnap.docs.map(item => ({ id: item.id, ...item.data() }));
    const challenges = challengesSnap.docs.map(item => ({ id: item.id, ...item.data() }));

    const relatedUids = new Set();
    incoming.forEach(item => relatedUids.add(item.senderUid));
    friendships.forEach(item => item.participants.forEach(uid => {
      if (uid !== user.uid) relatedUids.add(uid);
    }));
    challenges.forEach(item => item.participants.forEach(uid => {
      if (uid !== user.uid) relatedUids.add(uid);
    }));

    const profiles = {};
    await Promise.all([...relatedUids].map(async uid => {
      const snap = await getDoc(doc(db, 'publicProfiles', uid));
      if (snap.exists()) profiles[uid] = snap.data();
    }));

    return {
      profile: profileSnap.exists() ? profileSnap.data() : null,
      incoming,
      friendships,
      challenges,
      profiles
    };
  }

  async function sendFriendRequest(friendCode) {
    requireUser();
    return (await sendFriendRequestCall({ friendCode })).data;
  }

  async function respondFriendRequest(requestId, action) {
    requireUser();
    return (await respondFriendRequestCall({ requestId, action })).data;
  }

  async function removeFriend(friendUid) {
    requireUser();
    return (await removeFriendCall({ friendUid })).data;
  }

  async function blockUser(targetUid) {
    requireUser();
    return (await blockUserCall({ targetUid })).data;
  }

  async function createChallenge(opponentUid, questionSetId = 'weekly-mixed') {
    requireUser();
    return (await createChallengeCall({ opponentUid, questionSetId })).data;
  }

  async function respondChallenge(challengeId, action) {
    requireUser();
    return (await respondChallengeCall({ challengeId, action })).data;
  }

  async function submitChallengeScore(challengeId, score, time) {
    requireUser();
    return (await submitChallengeScoreCall({ challengeId, score, time })).data;
  }

  return {
    ensureProfile,
    loadDashboard,
    sendFriendRequest,
    respondFriendRequest,
    removeFriend,
    blockUser,
    createChallenge,
    respondChallenge,
    submitChallengeScore
  };
}
