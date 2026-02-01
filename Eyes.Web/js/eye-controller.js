/* ==================================================
   Idle detection + autonomous movement
================================================== */

let idleTimer = null;
let isIdle = false;
let autoMoveInterval = null;

// How long before idle mode activates (ms)
const IDLE_DELAY = 4000;

// How fast the autonomous movement updates (ms)
const AUTO_MOVE_RATE = 1200;





/* ==================================================
   Eye state registry
================================================== */

const eyeStates = [
    // Core system states
    "state-idle",
    "state-alert",
    "state-scanning",
    "state-down",
    "state-glitch",

    // Primary emotions
    "state-joy",
    "state-sadness",
    "state-anger",
    "state-fear",
    "state-disgust",
    "state-surprise",
    "state-trust",
    "state-anticipation",
    "state-love",

    // Higher-level / cognitive-emotional states
    "state-self-conscious",
    "state-cognitive",
    "state-social",
    "state-existential"
];

/* ==================================================
   Lazy CSS loader
================================================== */

const loadedStyles = new Set();

function loadEyeStyle(stateName) {
    if (loadedStyles.has(stateName)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `styles/${stateName}.css`;
    link.dataset.eyeStyle = stateName;

    document.head.appendChild(link);
    loadedStyles.add(stateName);
}

/* ==================================================
   State control
================================================== */

let currentIndex = 0;
const eyesWrapper = document.getElementById("eyesWrapper");

function applyEyeState(index) {
    const stateName = eyeStates[index];
    //alert(stateName);

    // Load CSS if needed
    loadEyeStyle(stateName);

    // Remove all state classes
    eyeStates.forEach(state =>
        eyesWrapper.classList.remove(state)
    );

    // Apply new state
    eyesWrapper.classList.add(stateName);
}

function nextState() {
    currentIndex = (currentIndex + 1) % eyeStates.length;
    applyEyeState(currentIndex);
}

/* ==================================================
   Init
================================================== */

applyEyeState(currentIndex);

document.querySelector(".viewport").addEventListener("click", e => {
    nextState();
    stopAutoMovement();
    resetIdleTimer();   
});

document.addEventListener("keydown", e => {
    if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        nextState();
    }
});

/* ==================================================
   Eye look control
================================================== */

const eyes = document.querySelectorAll(".eye");

// Maximum movement in pixels
const MAX_LOOK = 14;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function setEyeLook(xNorm, yNorm) {
    const x = clamp(xNorm * MAX_LOOK, -MAX_LOOK, MAX_LOOK);
    const y = clamp(yNorm * MAX_LOOK, -MAX_LOOK, MAX_LOOK);

    eyes.forEach(eye => {
        eye.style.setProperty("--look-x", `${x}px`);
        eye.style.setProperty("--look-y", `${y}px`);
    });
}

/* ==================================================
   Mouse / touch tracking
================================================== */

function handlePointerMove(clientX, clientY) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const xNorm = (clientX - cx) / cx;
    const yNorm = (clientY - cy) / cy;

    setEyeLook(xNorm, yNorm);
}

window.addEventListener("mousemove", e => {
    handlePointerMove(e.clientX, e.clientY);
    resetIdleTimer();
});

window.addEventListener("touchmove", e => {
    if (e.touches.length > 0) {
        const t = e.touches[0];
        handlePointerMove(t.clientX, t.clientY);
        resetIdleTimer();
    }
});

//window.addEventListener("touchmove", e => {
//    if (e.touches.length > 0) {
//        const t = e.touches[0];
//        handlePointerMove(t.clientX, t.clientY);
//    }
//});

function setEyeStateByName(stateName) {
    const index = eyeStates.indexOf(stateName);
    if (index !== -1) {
        currentIndex = index;
        applyEyeState(index);
    }
}

function startAutoMovement() {
    if (autoMoveInterval) return;

    isIdle = true;

    autoMoveInterval = setInterval(() => {
        // Random normalized values between -1 and 1
        const xNorm = (Math.random() * 2 - 1);
        const yNorm = (Math.random() * 2 - 1);

        setEyeLook(xNorm, yNorm);
    }, AUTO_MOVE_RATE);
}

function stopAutoMovement() {
    isIdle = false;

    if (autoMoveInterval) {
        clearInterval(autoMoveInterval);
        autoMoveInterval = null;
    }
}

function resetIdleTimer() {
    stopAutoMovement();

    if (idleTimer) clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {
        startAutoMovement();
    }, IDLE_DELAY);
}