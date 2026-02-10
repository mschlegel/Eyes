window.onAndroidNotification = function (data) {
    const box = document.getElementById("notificationOverlay");

    box.innerHTML = "";

    Object.keys(data).forEach(key => {
        const row = document.createElement("div");
        row.className = "notif-row";

        const k = document.createElement("div");
        k.className = "notif-key";
        k.textContent = key;

        const v = document.createElement("div");
        v.className = "notif-value";

        const value = data[key];

        // basic object detection
        if (typeof value === "string" && value.startsWith("content://")) {
            const img = document.createElement("img");
            img.src = value;
            img.style.maxWidth = "100%";
            v.appendChild(img);
        } else {
            v.textContent = value;
        }

        row.appendChild(k);
        row.appendChild(v);
        box.appendChild(row);
    });

    box.style.display = "block";
};
