/* global globalThis */
(function (root) {
  const DEFAULT_SETTINGS = Object.freeze({
    hideShorts: false,
    hideComments: false,
    hideRelated: false,
    hideHomeFeed: false,
    hideSidebar: false,
    hideEndScreens: false,
    hideLiveChat: false,
  });

  const TOGGLE_META = Object.freeze([
    {
      key: "hideShorts",
      label: "Shorts",
      description: "Ẩn Shorts trên feed, sidebar và shelf",
    },
    {
      key: "hideComments",
      label: "Comments",
      description: "Ẩn phần bình luận dưới video",
    },
    {
      key: "hideRelated",
      label: "Related videos",
      description: "Ẩn video đề xuất bên cạnh / dưới video",
    },
    {
      key: "hideHomeFeed",
      label: "Home feed",
      description: "Ẩn lưới video trên trang chủ",
    },
    {
      key: "hideSidebar",
      label: "Sidebar",
      description: "Ẩn thanh điều hướng bên trái",
    },
    {
      key: "hideEndScreens",
      label: "End screens",
      description: "Ẩn end screen cards khi xem video",
    },
    {
      key: "hideLiveChat",
      label: "Live chat",
      description: "Ẩn khung live chat / chat replay",
    },
  ]);

  const CLASS_MAP = Object.freeze({
    hideShorts: "yte-hide-shorts",
    hideComments: "yte-hide-comments",
    hideRelated: "yte-hide-related",
    hideHomeFeed: "yte-hide-home-feed",
    hideSidebar: "yte-hide-sidebar",
    hideEndScreens: "yte-hide-end-screens",
    hideLiveChat: "yte-hide-live-chat",
  });

  function normalizeSettings(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    const next = {};
    for (const key of Object.keys(DEFAULT_SETTINGS)) {
      next[key] =
        typeof source[key] === "boolean" ? source[key] : DEFAULT_SETTINGS[key];
    }
    return next;
  }

  root.YTE = Object.freeze({
    DEFAULT_SETTINGS,
    TOGGLE_META,
    CLASS_MAP,
    normalizeSettings,
  });
})(typeof globalThis !== "undefined" ? globalThis : self);
