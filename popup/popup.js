/* global chrome, YTE */
(function () {
  const listEl = document.getElementById("toggles");
  const resetBtn = document.getElementById("reset-btn");

  function createToggleRow(meta, checked) {
    const row = document.createElement("label");
    row.className = "row" + (checked ? " is-on" : "");
    row.htmlFor = meta.key;

    const copy = document.createElement("div");
    copy.className = "row-copy";
    copy.innerHTML = `<h2>${meta.label}</h2><p>${meta.description}</p>`;

    const switchWrap = document.createElement("div");
    switchWrap.className = "switch";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = meta.key;
    input.checked = checked;
    input.setAttribute("aria-label", meta.label);

    const slider = document.createElement("span");
    slider.className = "slider";

    switchWrap.append(input, slider);
    row.append(copy, switchWrap);

    input.addEventListener("change", async () => {
      row.classList.toggle("is-on", input.checked);
      await chrome.storage.sync.set({ [meta.key]: input.checked });
    });

    return row;
  }

  async function render() {
    const stored = await chrome.storage.sync.get(Object.keys(YTE.DEFAULT_SETTINGS));
    const settings = YTE.normalizeSettings(stored);

    listEl.replaceChildren();
    for (const meta of YTE.TOGGLE_META) {
      listEl.appendChild(createToggleRow(meta, settings[meta.key]));
    }
  }

  resetBtn.addEventListener("click", async () => {
    await chrome.storage.sync.set({ ...YTE.DEFAULT_SETTINGS });
    await render();
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;
    const relevant = Object.keys(YTE.DEFAULT_SETTINGS).some((key) =>
      Object.prototype.hasOwnProperty.call(changes, key)
    );
    if (relevant) render();
  });

  render();
})();
