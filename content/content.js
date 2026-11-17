/* global chrome, YTE */
(function () {
  function applySettings(settings) {
    const root = document.documentElement;
    if (!root || typeof YTE === "undefined") return;

    const normalized = YTE.normalizeSettings(settings);
    for (const [key, className] of Object.entries(YTE.CLASS_MAP)) {
      root.classList.toggle(className, Boolean(normalized[key]));
    }
  }

  async function loadAndApply() {
    try {
      const stored = await chrome.storage.sync.get(
        Object.keys(YTE.DEFAULT_SETTINGS)
      );
      applySettings(stored);
    } catch (error) {
      console.warn("[YouTube UI Hide] Failed to load settings", error);
      applySettings(YTE.DEFAULT_SETTINGS);
    }
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;

    const touched = Object.keys(YTE.DEFAULT_SETTINGS).some((key) =>
      Object.prototype.hasOwnProperty.call(changes, key)
    );
    if (!touched) return;

    chrome.storage.sync
      .get(Object.keys(YTE.DEFAULT_SETTINGS))
      .then(applySettings);
  });

  loadAndApply();
})();
