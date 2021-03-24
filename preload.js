let fs = require("fs");
const { ipcRenderer } = require("electron");

const styleElement = document.createElement("style");

styleElement.innerHTML = fs.readFileSync("style.css").toString("utf-8");

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
