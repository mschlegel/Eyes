window.onAndroidNotification = function (title, text) {
    const box = document.getElementById("testOverlay");
    box.innerText = title + ": " + text;
    box.style.display = "block";
};
