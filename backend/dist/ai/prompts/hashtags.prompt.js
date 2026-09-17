"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHashtagsPrompt = buildHashtagsPrompt;
function buildHashtagsPrompt(post, topic) {
    return `You are a LinkedIn hashtag expert. Generate relevant hashtags for this post.

Post topic: ${topic}

Post:
---
${post}
---

RULES:
- Return 3-6 hashtags maximum
- Only include truly relevant hashtags
- Mix broad and specific hashtags
- Do not invent hashtags that don't exist
- Format as #HashTag (PascalCase preferred)

Return ONLY valid JSON array of strings. No extra text:
["#HashTag1", "#HashTag2", "#HashTag3"]`;
}
//# sourceMappingURL=hashtags.prompt.js.map