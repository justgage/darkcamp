let fs = require("fs");
const { ipcRenderer } = require("electron");

// prod development
const styleElement = document.createElement("style");
styleElement.innerHTML = fs.readFileSync("docs/style.css").toString("utf-8");

// Local development
// const styleElement = document.createElement("link");
// styleElement.type = "text/css";
// styleElement.rel = "stylesheet";
// styleElement.href = "https://justgage.github.io/darkcamp/style.css";

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
