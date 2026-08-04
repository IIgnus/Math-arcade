export function createNavigation({
  initialView = 'home-view',
  canLeaveCurrentView = () => true,
  onNavigate,
  onBlocked
}) {
  let currentView = null;
  let handlingPopState = false;

  function navigate(viewId, { replace = false, fromHistory = false } = {}) {
    if (!viewId || viewId === currentView) {
      return true;
    }

    if (!fromHistory && !canLeaveCurrentView(currentView, viewId)) {
      onBlocked?.(currentView, viewId);
      return false;
    }

    currentView = viewId;
    onNavigate(viewId);

    if (!fromHistory) {
      const method = replace ? 'replaceState' : 'pushState';
      history[method]({ stemQuestView: viewId }, '', `#${viewId}`);
    }

    return true;
  }

  function start(restoredView) {
    const hashView = location.hash.replace(/^#/, '');
    const firstView = restoredView || hashView || initialView;

    handlingPopState = true;
    navigate(firstView, { replace: true, fromHistory: true });
    history.replaceState({ stemQuestView: firstView }, '', `#${firstView}`);
    handlingPopState = false;

    window.addEventListener('popstate', event => {
      if (handlingPopState) return;

      const target = event.state?.stemQuestView || initialView;
      if (!canLeaveCurrentView(currentView, target)) {
        history.pushState({ stemQuestView: currentView }, '', `#${currentView}`);
        onBlocked?.(currentView, target);
        return;
      }

      handlingPopState = true;
      navigate(target, { fromHistory: true });
      handlingPopState = false;
    });
  }

  return {
    start,
    navigate,
    current: () => currentView
  };
}
