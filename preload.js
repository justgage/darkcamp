let fs = require("fs");
const { ipcRenderer } = require("electron");

var ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = "justgage.github.io/darkcamp/style.css";

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementsByTagName("head")[0].appendChild(styleElement);
});

setInterval(function () {
  const unreadBadges = document.querySelectorAll(".unread-badge--for-nav");

  if (unreadBadges && unreadBadges != []) {
    let badgeCountsTotal = 0;

    for (const unreadBage of unreadBadges) {
      badgeCountsTotal += new Number(unreadBage.dataset.badgeCount);
    }

    ipcRenderer.send("badge-update", badgeCountsTotal);
  }
}, 1000);
