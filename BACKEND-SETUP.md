# STEM Quest v11.1 Firebase setup

## Requirements

- Firebase Authentication with Google enabled
- Cloud Firestore enabled
- Firebase CLI installed and logged in
- A Firebase plan that permits deploying Cloud Functions

## Deploy

From the project root:

```bash
firebase login
firebase use math-game-19070
npm --prefix functions install
firebase deploy --only firestore:rules,firestore:indexes
firebase deploy --only functions
```

The GitHub Pages upload does not deploy Cloud Functions, indexes or rules.

## Social collections

- `users/{uid}` — private learning progress
- `publicProfiles/{uid}` — safe public profile fields and friend code
- `friendCodes/{code}` — server-only lookup
- `friendRequests/{senderUid_recipientUid}` — participant-readable, server-written
- `friendships/{sortedUidPair}` — participant-readable, server-written
- `blocks/{ownerUid_targetUid}` — server-only
- `challenges/{challengeId}` — participant-readable, server-written

## App Check

Add App Check only after creating a reCAPTCHA Enterprise website key and registering the GitHub Pages domain. Begin in monitoring mode before enforcing it for Firestore or Functions.

## Testing

Use two separate Google accounts:

1. Sign in to each account once so both public profiles and friend codes are created.
2. Copy account A's friend code into account B.
3. Accept the request on account A.
4. Send a challenge.
5. Accept and play from both accounts.
6. Verify both scores appear and the challenge becomes complete.
