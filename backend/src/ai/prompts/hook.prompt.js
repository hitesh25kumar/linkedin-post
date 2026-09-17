"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHookPrompt = buildHookPrompt;
function buildHookPrompt(post, instruction) {
    return "You are a LinkedIn copywriting expert specializing in hooks \u2014 the opening line that stops people scrolling.\n\nOriginal post:\n---\n".concat(post, "\n---\n\nInstruction for the new hook: ").concat(instruction, "\n\nRULES:\n- The hook must be 1-2 lines maximum\n- It must relate to the post content\n- Make it specific, not generic\n- Do not use: \"In today's world\", \"Are you struggling\", \"game-changing\", \"Let's dive in\"\n- It should create curiosity or make a bold statement\n\nReturn ONLY the hook text. No explanation, no extra text.");
}
