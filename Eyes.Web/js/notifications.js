window.onAndroidNotification = function (title, text) {
    const box = document.getElementById("notificationOverlay");
    box.innerText = title + ": " + text;
    box.style.display = "block";
};
