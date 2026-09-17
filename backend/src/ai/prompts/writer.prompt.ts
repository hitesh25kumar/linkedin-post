import { GeneratePostInput, ResearchContext } from '../providers/ai.provider';

export function buildWriterPrompt(
  input: GeneratePostInput,
  context: ResearchContext,
): string {
  const profileSection = input.userProfile
    ? `AUTHOR PROFILE:
Name: ${input.userProfile.name || ''}
Headline: ${input.userProfile.headline || ''}
Industry: ${input.userProfile.industry || ''}
Expertise: ${(input.userProfile.expertise || []).join(', ')}
Bio: ${input.userProfile.bio || ''}`
    : '';

  const lengthGuide =
    (
      {
        Short: '500-800 characters',
        Medium: '800-1500 characters',
        Long: '1500-2500 characters',
      } as Record<string, string>
    )[input.length] || '800-1500 characters';

  return `You are an expert LinkedIn ghostwriter who writes for senior professionals.

Write a LinkedIn post with these specifications:

TOPIC: ${input.topic}
AUDIENCE: ${input.audience || 'Professionals'}
TONE: ${input.tone}
POST TYPE: ${input.postType}
GOAL: ${input.goal}
LENGTH: approximately ${lengthGuide}
${input.instructions ? `SPECIAL INSTRUCTIONS: ${input.instructions}` : ''}
${profileSection}

RESEARCH CONTEXT:
Key Points: ${context.keyPoints.join('; ')}
Angles to consider: ${context.angles.join('; ')}
Considerations: ${context.importantConsiderations.join('; ')}

FACTUAL RISKS TO AVOID:
${context.factualRisk.join('\n')}

WRITING RULES:
1. Start with a strong, specific hook — not a generic statement
2. Write short paragraphs (1-3 lines max)
3. Sound human, not like AI
4. Do NOT use: "In today's rapidly evolving world", "Let's dive in", "game-changing", "revolutionize", "unlock your potential", "The future is here"
5. Avoid excessive bullet points — use them only when truly helpful
6. Avoid corporate jargon
7. Do NOT invent statistics, studies, papers, or quotes
8. Do NOT invent personal experiences the author hasn't shared — use "I've been thinking about" instead of "I recently worked on" unless the profile provides real context
9. Use arrows (→) sparingly, only for actual lists
10. 3-5 hashtags maximum, relevant only
11. Keep the tone consistent throughout
12. End with something that invites thought or response — not a sales pitch

Return ONLY valid JSON (no markdown fences, no extra text):
{
  "title": "short descriptive title for this post",
  "content": "the full LinkedIn post text including hashtags"
}`;
}
