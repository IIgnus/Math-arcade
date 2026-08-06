# STEM Quest v6 — Reliability Upgrade

Replace the matching files in your repository and keep the folder structure exactly as shown.

## Structure

index.html
styles.css
app.js
course-data.js
firestore.rules

js/
- app-state.js
- navigation.js
- save-service.js
- error-handler.js
- content-loader.js
- content-validator.js
- quiz-engine.js
- progression.js
- calculator.js
- scratchpad.js

## Added

- Browser back/forward navigation support
- Current-view restoration after refresh
- Quiz exit and refresh protection
- Queued saves to prevent overlapping Firestore writes
- Immediate local backup on page close
- Saving/Saved status badge
- Loading overlay for cloud progress
- Global error and rejected-promise handling
- Online/offline notifications
- Friendly fatal-error support

After uploading, wait for GitHub Pages to deploy and press Ctrl + Shift + R.
