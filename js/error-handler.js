export function createErrorHandler({ toast, modal }) {
  function friendlyMessage(error) {
    const message = String(error?.message || error || 'Unknown error');

    if (message.includes('Content validation failed')) {
      return 'Some course content could not be loaded. Check the Content Health report.';
    }

    if (message.includes('Failed to fetch') || message.includes('network')) {
      return 'A network request failed. Your local progress is still available.';
    }

    return 'Something went wrong. Refreshing the page usually fixes this.';
  }

  function report(error, context = 'Application') {
    console.error(`[${context}]`, error);
    toast?.(friendlyMessage(error));
  }

  function showFatal(error, context = 'Application startup') {
    console.error(`[${context}]`, error);
    modal?.(`
      <div class="fatal-error-card">
        <div class="confirmation-icon">🛠️</div>
        <p class="eyebrow">STEM QUEST ERROR</p>
        <h2>The app could not finish loading</h2>
        <p>${escapeHtml(friendlyMessage(error))}</p>
        <p class="muted">Open the browser console for technical details, then refresh after correcting the reported file.</p>
        <button class="btn primary" onclick="location.reload()">Refresh app</button>
      </div>
    `);
  }

  window.addEventListener('error', event => {
    report(event.error || event.message, 'Unhandled error');
  });

  window.addEventListener('unhandledrejection', event => {
    report(event.reason, 'Unhandled promise rejection');
  });

  window.addEventListener('offline', () => {
    toast?.('You are offline. Progress will continue saving on this device.');
  });

  window.addEventListener('online', () => {
    toast?.('You are back online. Cloud saving can resume.');
  });

  return { report, showFatal };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}
