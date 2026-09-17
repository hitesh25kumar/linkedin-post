"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWriterPrompt = buildWriterPrompt;
function buildWriterPrompt(input, context) {
    var profileSection = input.userProfile
        ? "AUTHOR PROFILE:\nName: ".concat(input.userProfile.name || '', "\nHeadline: ").concat(input.userProfile.headline || '', "\nIndustry: ").concat(input.userProfile.industry || '', "\nExpertise: ").concat((input.userProfile.expertise || []).join(', '), "\nBio: ").concat(input.userProfile.bio || '')
        : '';
    var lengthGuide = {
        Short: '500-800 characters',
        Medium: '800-1500 characters',
        Long: '1500-2500 characters',
    }[input.length] || '800-1500 characters';
    return "You are an expert LinkedIn ghostwriter who writes for senior professionals.\n\nWrite a LinkedIn post with these specifications:\n\nTOPIC: ".concat(input.topic, "\nAUDIENCE: ").concat(input.audience || 'Professionals', "\nTONE: ").concat(input.tone, "\nPOST TYPE: ").concat(input.postType, "\nGOAL: ").concat(input.goal, "\nLENGTH: approximately ").concat(lengthGuide, "\n").concat(input.instructions ? "SPECIAL INSTRUCTIONS: ".concat(input.instructions) : '', "\n").concat(profileSection, "\n\nRESEARCH CONTEXT:\nKey Points: ").concat(context.keyPoints.join('; '), "\nAngles to consider: ").concat(context.angles.join('; '), "\nConsiderations: ").concat(context.importantConsiderations.join('; '), "\n\nFACTUAL RISKS TO AVOID:\n").concat(context.factualRisk.join('\n'), "\n\nWRITING RULES:\n1. Start with a strong, specific hook \u2014 not a generic statement\n2. Write short paragraphs (1-3 lines max)\n3. Sound human, not like AI\n4. Do NOT use: \"In today's rapidly evolving world\", \"Let's dive in\", \"game-changing\", \"revolutionize\", \"unlock your potential\", \"The future is here\"\n5. Avoid excessive bullet points \u2014 use them only when truly helpful\n6. Avoid corporate jargon\n7. Do NOT invent statistics, studies, papers, or quotes\n8. Do NOT invent personal experiences the author hasn't shared \u2014 use \"I've been thinking about\" instead of \"I recently worked on\" unless the profile provides real context\n9. Use arrows (\u2192) sparingly, only for actual lists\n10. 3-5 hashtags maximum, relevant only\n11. Keep the tone consistent throughout\n12. End with something that invites thought or response \u2014 not a sales pitch\n\nReturn ONLY valid JSON (no markdown fences, no extra text):\n{\n  \"title\": \"short descriptive title for this post\",\n  \"content\": \"the full LinkedIn post text including hashtags\"\n}");
}
