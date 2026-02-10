window.onAndroidNotification = function (payload) {
    const box = document.getElementById("notificationOverlay");
    box.innerHTML = "";

    // ------------------------------
    // Normalize input
    // ------------------------------
    let data = payload;

    if (typeof payload === "string") {
        try {
            data = JSON.parse(payload);
        } catch (e) {
            console.log("Failed to parse JSON", e);
            return;
        }
    }

    if (!data || typeof data !== "object") {
        box.innerText = "Invalid notification payload";
        box.style.display = "block";
        return;
    }

    // ------------------------------
    // Build rows
    // ------------------------------
    Object.keys(data).forEach(key => {
        const row = document.createElement("div");
        row.className = "notif-row";

        const k = document.createElement("div");
        k.className = "notif-key";
        k.textContent = key;

        const v = document.createElement("div");
        v.className = "notif-value";

        const value = data[key];

        // Pretty print objects / arrays
        if (typeof value === "object") {
            v.textContent = JSON.stringify(value, null, 2);
        } else {
            v.textContent = value;
        }

        row.appendChild(k);
        row.appendChild(v);
        box.appendChild(row);
    });

    box.style.display = "block";
};
