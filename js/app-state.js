const DEFAULT_KEY = 'stemQuestAppState';

export function createAppState({ key = DEFAULT_KEY } = {}) {
  function read() {
    try {
      return JSON.parse(sessionStorage.getItem(key) || 'null') || {};
    } catch {
      return {};
    }
  }

  function write(patch) {
    const next = {
      ...read(),
      ...patch,
      updatedAt: Date.now()
    };

    sessionStorage.setItem(key, JSON.stringify(next));
    return next;
  }

  function clear() {
    sessionStorage.removeItem(key);
  }

  return { read, write, clear };
}
