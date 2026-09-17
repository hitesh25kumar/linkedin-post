import { GeneratePostInput } from '../providers/ai.provider';

export function buildCriticPrompt(
  post: string,
  input: GeneratePostInput,
): string {
  return `You are a senior LinkedIn content strategist reviewing a professional's LinkedIn post.

Evaluate this post honestly and constructively.

POST TO REVIEW:
---
${post}
---

CONTEXT:
Target Audience: ${input.audience || 'Professionals'}
Tone: ${input.tone}
Goal: ${input.goal}

EVALUATE THESE DIMENSIONS (score each 1-10):
- Overall quality
- Hook strength (first 2 lines)
- Clarity and readability
- Value delivered to reader
- Authenticity (sounds human, not AI)
- Engagement potential

ALSO CHECK:
- Are there generic AI phrases? (e.g., "game-changing", "rapidly evolving")
- Are there unsupported factual claims?
- Is the CTA effective?
- Are hashtags relevant and appropriate in number?
- Is there unnecessary repetition?

IMPORTANT: Scores represent writing quality. They are NOT a guarantee of LinkedIn performance.

Return ONLY valid JSON (no markdown fences, no extra text):
{
  "overallScore": 0,
  "hookScore": 0,
  "clarityScore": 0,
  "valueScore": 0,
  "authenticityScore": 0,
  "engagementScore": 0,
  "strengths": ["string", ...],
  "weaknesses": ["string", ...],
  "suggestions": ["string", ...],
  "factualWarnings": ["string", ...]
}`;
}
