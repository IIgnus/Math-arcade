import { getRemoteConfig, fetchAndActivate, getBoolean, getString, isSupported as remoteConfigSupported } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-remote-config.js';
import { getAnalytics, logEvent, isSupported as analyticsSupported } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js';

export function createBackendService({ app, config, onStatus = () => {} }) {
  let analytics = null;
  let remoteConfig = null;
  const flags = {
    showOnboarding: true,
    tournamentsEnabled: true,
    developerToolsEnabled: false,
    maintenanceMessage: ''
  };

  async function initialize() {
    const states = [];

    try {
      if (await remoteConfigSupported()) {
        remoteConfig = getRemoteConfig(app);
        remoteConfig.settings.minimumFetchIntervalMillis = 60 * 60 * 1000;
        remoteConfig.defaultConfig = {
          show_onboarding: 'true',
          tournaments_enabled: 'true',
          developer_tools_enabled: 'false',
          maintenance_message: ''
        };
        await fetchAndActivate(remoteConfig);
        flags.showOnboarding = getBoolean(remoteConfig, 'show_onboarding');
        flags.tournamentsEnabled = getBoolean(remoteConfig, 'tournaments_enabled');
        flags.developerToolsEnabled = getBoolean(remoteConfig, 'developer_tools_enabled');
        flags.maintenanceMessage = getString(remoteConfig, 'maintenance_message');
        states.push('Remote Config');
      }
    } catch (error) {
      console.warn('Remote Config unavailable; using local defaults.', error);
    }

    try {
      if (config.measurementId && await analyticsSupported()) {
        analytics = getAnalytics(app);
        states.push('Analytics');
      }
    } catch (error) {
      console.warn('Analytics unavailable.', error);
    }

    onStatus({ ready: true, services: states, flags: { ...flags } });
    return { ...flags };
  }

  function track(name, parameters = {}) {
    if (!analytics) return;
    try { logEvent(analytics, name, parameters); } catch (error) { console.warn(error); }
  }

  return { initialize, track, getFlags: () => ({ ...flags }) };
}
