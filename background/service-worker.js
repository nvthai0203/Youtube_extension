/* global chrome, importScripts, YTE */
importScripts(chrome.runtime.getURL("shared/defaults.js"));

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.sync.get(null);
  const settings = YTE.normalizeSettings(stored);
  await chrome.storage.sync.set({ ...YTE.DEFAULT_SETTINGS, ...settings });
});
