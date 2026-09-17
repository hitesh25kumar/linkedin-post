"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCtaPrompt = buildCtaPrompt;
function buildCtaPrompt(post, goal) {
    return "You are a LinkedIn content expert. Write a natural call-to-action for this post.\n\nPost:\n---\n".concat(post, "\n---\n\nGoal: ").concat(goal, "\n\nRULES:\n- The CTA must feel natural and conversational, not salesy\n- It should invite genuine engagement (comment, share a perspective)\n- 1-2 sentences maximum\n- Do not use: \"Drop a comment below\", \"Like and share\", \"Follow me for more\"\n- Make it specific to the post topic\n\nReturn ONLY the CTA text. No explanation, no extra text.");
}
