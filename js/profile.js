(function () {
  "use strict";

  var TIME_INTERVAL_MS = 750;
  var timeEl = document.getElementById("profile-user-time");
  var avatarImg = document.getElementById("profile-avatar-img");
  var urlInput = document.getElementById("avatar-url-input");
  var urlApplyBtn = document.getElementById("avatar-url-apply");
  var fileInput = document.getElementById("avatar-file-input");

  var objectUrlToRevoke = null;

  function updateTime() {
    if (!timeEl) return;
    timeEl.textContent = String(Date.now());
  }

  function revokePreviousObjectUrl() {
    if (objectUrlToRevoke) {
      URL.revokeObjectURL(objectUrlToRevoke);
      objectUrlToRevoke = null;
    }
  }

  function applyImageUrl(url) {
    if (!avatarImg || !url) return;
    revokePreviousObjectUrl();
    avatarImg.src = url;
  }

  function initTimeClock() {
    updateTime();
    window.setInterval(updateTime, TIME_INTERVAL_MS);
  }

  function initAvatarUrl() {
    if (!urlApplyBtn || !urlInput || !avatarImg) return;
    urlApplyBtn.addEventListener("click", function () {
      var raw = urlInput.value.trim();
      if (!raw) return;
      try {
        new URL(raw);
      } catch {
        return;
      }
      applyImageUrl(raw);
    });
  }

  function initAvatarFile() {
    if (!fileInput || !avatarImg) return;
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file || !file.type || file.type.indexOf("image/") !== 0) return;
      revokePreviousObjectUrl();
      objectUrlToRevoke = URL.createObjectURL(file);
      avatarImg.src = objectUrlToRevoke;
    });
  }

  initTimeClock();
  initAvatarUrl();
  initAvatarFile();
})();
