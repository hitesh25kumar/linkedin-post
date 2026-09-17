"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHookPrompt = buildHookPrompt;
function buildHookPrompt(post, instruction) {
    return `You are a LinkedIn copywriting expert specializing in hooks — the opening line that stops people scrolling.

Original post:
---
${post}
---

Instruction for the new hook: ${instruction}

RULES:
- The hook must be 1-2 lines maximum
- It must relate to the post content
- Make it specific, not generic
- Do not use: "In today's world", "Are you struggling", "game-changing", "Let's dive in"
- It should create curiosity or make a bold statement

Return ONLY the hook text. No explanation, no extra text.`;
}
//# sourceMappingURL=hook.prompt.js.map