/* ==================================================
   Emotion detection (client-side, rule-based)
================================================== */

const emotionKeywords = {
    joy: ["happy", "great", "awesome", "love", "excited"],
    sadness: ["sad", "down", "depressed", "cry", "unhappy"],
    anger: ["angry", "mad", "furious", "hate", "annoyed"],
    fear: ["scared", "afraid", "terrified", "fear"],
    disgust: ["gross", "disgusting", "nasty"],
    surprise: ["wow", "what", "unexpected", "surprised"],
    trust: ["trust", "safe", "reliable"],
    anticipation: ["soon", "expect", "waiting", "hope"],
    love: ["love", "adore", "care"],
    selfConscious: ["embarrassed", "awkward", "ashamed"],
    cognitive: ["think", "analyze", "consider", "logic"],
    social: ["we", "together", "friends", "people"],
    existential: ["why", "meaning", "existence", "life"]
};

function detectEmotion(text) {
    for (const [emotion, words] of Object.entries(emotionKeywords)) {
        if (words.some(word => text.includes(word))) {
            return emotion;
        }
    }
    return null;
}
