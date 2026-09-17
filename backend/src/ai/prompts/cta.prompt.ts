export function buildCtaPrompt(post: string, goal: string): string {
  return `You are a LinkedIn content expert. Write a natural call-to-action for this post.

Post:
---
${post}
---

Goal: ${goal}

RULES:
- The CTA must feel natural and conversational, not salesy
- It should invite genuine engagement (comment, share a perspective)
- 1-2 sentences maximum
- Do not use: "Drop a comment below", "Like and share", "Follow me for more"
- Make it specific to the post topic

Return ONLY the CTA text. No explanation, no extra text.`;
}
