"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHashtagsPrompt = buildHashtagsPrompt;
function buildHashtagsPrompt(post, topic) {
    return "You are a LinkedIn hashtag expert. Generate relevant hashtags for this post.\n\nPost topic: ".concat(topic, "\n\nPost:\n---\n").concat(post, "\n---\n\nRULES:\n- Return 3-6 hashtags maximum\n- Only include truly relevant hashtags\n- Mix broad and specific hashtags\n- Do not invent hashtags that don't exist\n- Format as #HashTag (PascalCase preferred)\n\nReturn ONLY valid JSON array of strings. No extra text:\n[\"#HashTag1\", \"#HashTag2\", \"#HashTag3\"]");
}
