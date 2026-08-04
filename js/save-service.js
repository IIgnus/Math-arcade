export function createSaveService({
  writeLocal,
  writeCloud,
  onStatus = () => {},
  onError = () => {}
}) {
  let chain = Promise.resolve();
  let pending = 0;
  let lastSavedAt = 0;

  function setStatus(state, detail = '') {
    onStatus({ state, detail, pending, lastSavedAt });
  }

  function save(snapshot, { cloud = true } = {}) {
    pending++;
    setStatus('saving');

    chain = chain
      .catch(() => {})
      .then(async () => {
        writeLocal(snapshot);

        if (cloud && writeCloud) {
          await writeCloud(snapshot);
        }

        lastSavedAt = Date.now();
      })
      .catch(error => {
        onError(error);
        throw error;
      })
      .finally(() => {
        pending = Math.max(0, pending - 1);
        setStatus(pending ? 'saving' : 'saved');
      });

    return chain;
  }

  function saveLocalImmediately(snapshot) {
    try {
      writeLocal(snapshot);
      lastSavedAt = Date.now();
      setStatus('saved');
    } catch (error) {
      onError(error);
    }
  }

  function flush() {
    return chain.catch(() => {});
  }

  return {
    save,
    saveLocalImmediately,
    flush,
    getLastSavedAt: () => lastSavedAt
  };
}
