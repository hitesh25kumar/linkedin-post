import {
  IAiProvider,
  ResearchContext,
  PostDraft,
  CritiqueResult,
  ImprovedPost,
  GeneratePostInput,
} from './ai.provider';

const SAMPLE_POST = `AI agents won't replace Product Managers.

But Product Managers who know how to work with AI agents may move much faster.

Think about what a PM spends time doing every week:

→ Reading customer feedback
→ Analyzing product data
→ Writing PRDs
→ Creating user stories
→ Preparing meeting notes

A lot of this work isn't necessarily product strategy.

It's information processing.

That's where AI agents become interesting.

Instead of simply asking AI to summarize 50 customer complaints, an agent can help categorize them, identify patterns and surface areas that deserve deeper investigation.

The PM can then spend more time asking: "What should we actually build?"

That's the shift I find most interesting.

AI isn't just making individual tasks faster.

It's changing where product managers can spend their time creating value.`;

export class MockProvider implements IAiProvider {
  isDemo(): boolean {
    return true;
  }

  async researchTopic(_input: GeneratePostInput): Promise<ResearchContext> {
    await this.delay(800);
    return {
      keyPoints: [
        'AI agents are transforming how professionals work',
        'Information processing is a major time sink for knowledge workers',
        'The shift is from doing tasks to directing agents',
      ],
      angles: [
        'Productivity angle: how much time can AI save?',
        'Strategic angle: what new capabilities does this unlock?',
        'Human angle: what skills become more valuable?',
      ],
      importantConsiderations: [
        'AI agents are tools, not replacements',
        'Quality of output depends on quality of direction',
      ],
      potentialClaims: [
        'PMs spend 40-60% of time on information processing (unverified)',
      ],
      factualRisk: [
        'Statistics about time allocation are estimates — do not present as verified data',
      ],
    };
  }

  async generatePost(
    input: GeneratePostInput,
    _context: ResearchContext,
  ): Promise<PostDraft> {
    await this.delay(1200);
    return {
      title: input.topic || 'AI in Professional Work',
      content: SAMPLE_POST,
    };
  }

  async critiquePost(
    _post: string,
    _input: GeneratePostInput,
  ): Promise<CritiqueResult> {
    await this.delay(800);
    return {
      overallScore: 8.5,
      hookScore: 8,
      clarityScore: 9,
      valueScore: 8,
      authenticityScore: 9,
      engagementScore: 8.5,
      strengths: [
        'Strong, provocative opening hook',
        'Clear and readable structure',
        'Avoids generic AI buzzwords',
        'Honest about what AI can and cannot do',
      ],
      weaknesses: [
        'Could include a more concrete real-world example',
        'The closing could be slightly stronger',
      ],
      suggestions: [
        'Consider adding a specific scenario where an agent helped with customer feedback',
        'The CTA could directly invite readers to share their experience',
      ],
      factualWarnings: [
        'The time allocation percentages are estimates — removed from post to avoid unverified claims',
      ],
    };
  }

  async improvePost(
    _post: string,
    _critique: CritiqueResult,
    input: GeneratePostInput,
  ): Promise<ImprovedPost> {
    await this.delay(1000);
    return {
      title: input.topic || 'AI in Professional Work',
      hook: "AI agents won't replace Product Managers.",
      finalPost: SAMPLE_POST,
      hashtags: [
        '#ProductManagement',
        '#AI',
        '#AIAgents',
        '#ProductManager',
        '#FutureOfWork',
      ],
      cta: "How are you thinking about AI agents in your work? I'd love to hear your perspective.",
      warnings: [],
    };
  }

  async generateHook(
    _post: string,
    _instruction: string,
  ): Promise<string> {
    await this.delay(600);
    return 'Most people are asking the wrong question about AI in product management.';
  }

  async generateCTA(_post: string, _goal: string): Promise<string> {
    await this.delay(600);
    return "What's your take? I'd love to hear how you're thinking about this.";
  }

  async generateHashtags(
    _post: string,
    _topic: string,
  ): Promise<string[]> {
    await this.delay(400);
    return [
      '#ProductManagement',
      '#AI',
      '#AIAgents',
      '#ProductManager',
      '#FutureOfWork',
    ];
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
