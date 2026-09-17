"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEditorPrompt = buildEditorPrompt;
function buildEditorPrompt(post, critique, input) {
    return `You are an expert LinkedIn editor. You have received a draft post and professional critique. Your job is to improve the post.

ORIGINAL POST:
---
${post}
---

CRITIQUE:
Strengths: ${critique.strengths.join('; ')}
Weaknesses: ${critique.weaknesses.join('; ')}
Suggestions: ${critique.suggestions.join('; ')}
Factual Warnings: ${critique.factualWarnings.join('; ')}

CONTEXT:
Tone: ${input.tone}
Goal: ${input.goal}
Audience: ${input.audience || 'Professionals'}

EDITING RULES:
1. Preserve the original meaning — do not change the core message
2. Improve the hook — make the first line more compelling and specific
3. Remove unnecessary words and sentences
4. Make language more natural and human
5. Ensure paragraphs are short (1-3 lines)
6. Improve specificity where possible
7. Remove any generic AI phrases
8. Keep the requested tone throughout
9. Do NOT invent facts, statistics, or personal experiences not in the original
10. Fix any issues raised in the critique
11. Keep 3-5 relevant hashtags
12. The CTA should feel natural, not salesy

Return ONLY valid JSON (no markdown fences, no extra text):
{
  "title": "short descriptive title",
  "hook": "just the hook/opening line",
  "finalPost": "the complete improved post including hashtags",
  "hashtags": ["#tag1", "#tag2"],
  "cta": "the call-to-action line at the end",
  "warnings": ["any important notes about the post content"]
}`;
}
//# sourceMappingURL=editor.prompt.js.map