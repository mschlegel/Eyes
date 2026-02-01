/* ==================================================
   Emotion ? Eye State Bridge
================================================== */

const emotionToEyeState = {
    joy: "state-joy",
    sadness: "state-sadness",
    anger: "state-anger",
    fear: "state-fear",
    disgust: "state-disgust",
    surprise: "state-surprise",
    trust: "state-trust",
    anticipation: "state-anticipation",
    love: "state-love",
    selfConscious: "state-self-conscious",
    cognitive: "state-cognitive",
    social: "state-social",
    existential: "state-existential"
};

function handleDetectedSpeech(text) {
    const emotion = detectEmotion(text);
    if (!emotion) return;

    const state = emotionToEyeState[emotion];
    if (!state) return;


    setEyeStateByName(state);
}
