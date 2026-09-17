import { Textarea } from '../common/Textarea';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { cn } from '../../utils/cn';
import {
  Target, Users, MessageCircle, Type, AlignLeft, Lightbulb, Sparkles
} from 'lucide-react';

interface PostFormProps {
  topic: string; setTopic: (v: string) => void;
  audience: string; setAudience: (v: string) => void;
  tone: string; setTone: (v: string) => void;
  postType: string; setPostType: (v: string) => void;
  goal: string; setGoal: (v: string) => void;
  length: string; setLength: (v: string) => void;
  instructions: string; setInstructions: (v: string) => void;
}

const TONES = [
  { label: 'Professional', emoji: '💼' },
  { label: 'Conversational', emoji: '💬' },
  { label: 'Educational', emoji: '📚' },
  { label: 'Storytelling', emoji: '📖' },
  { label: 'Bold', emoji: '⚡' },
  { label: 'Thought-provoking', emoji: '🧠' },
];

const POST_TYPES = [
  'Industry Insight', 'Educational', 'Personal Story',
  'Product Management', 'AI / Technology', 'Career Advice', 'How-To', 'Case Study',
];

const GOALS = [
  'Engagement', 'Thought Leadership', 'Education', 'Personal Branding', 'Lead Generation',
];

const LENGTHS = [
  { label: 'Short', desc: '< 500 chars', icon: '▪' },
  { label: 'Medium', desc: '500–1500', icon: '▪▪' },
  { label: 'Long', desc: '> 1500 chars', icon: '▪▪▪' },
];

const PROMPT_SUGGESTIONS = [
  '🚀 5 AI tools that doubled our team\'s productivity this quarter',
  '💡 Why most SaaS products fail at user onboarding and how to fix it',
  '🧠 3 hard-learned lessons from transitioning from Dev to Product Manager',
  '📈 The non-obvious secret to scaling remote engineering teams',
];

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center border border-indigo-100/50 shadow-xs">
        <Icon className="w-3.5 h-3.5 text-indigo-600" />
      </div>
      <label className="text-sm font-bold text-gray-900">{label}</label>
    </div>
  );
}

export function PostForm(props: PostFormProps) {
  return (
    <div className="space-y-6">
      {/* Topic */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel icon={Lightbulb} label="Your Post Idea" />
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Quick Prompt
          </span>
        </div>
        <Textarea
          value={props.topic}
          onChange={(e) => props.setTopic(e.target.value)}
          placeholder="What do you want to share? e.g. How AI agents are changing Product Management..."
          className="min-h-[120px] text-[14px] leading-relaxed border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rounded-xl"
        />
        
        {/* Suggestion Chips */}
        <div className="mt-3">
          <p className="text-[11px] font-medium text-gray-400 mb-2">Need inspiration? Click to use:</p>
          <div className="flex flex-wrap gap-1.5">
            {PROMPT_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => props.setTopic(suggestion)}
                className="text-left text-[11px] font-medium text-gray-600 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50/70 border border-gray-200/80 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-2 text-right">{props.topic.length} characters</p>
      </div>

      {/* Tone */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
        <SectionLabel icon={MessageCircle} label="Tone of Voice" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {TONES.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => props.setTone(t.label)}
              className={cn(
                'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150',
                props.tone === t.label
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-600 text-white shadow-md shadow-indigo-200/60 scale-[1.02]'
                  : 'bg-gray-50/80 border-gray-100 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700'
              )}
            >
              <span className="text-base">{t.emoji}</span>
              <span className="text-xs font-semibold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Post Type + Length */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
          <SectionLabel icon={Type} label="Post Type" />
          <Select value={props.postType} onChange={(e) => props.setPostType(e.target.value)}>
            {POST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
          <SectionLabel icon={AlignLeft} label="Length" />
          <div className="grid grid-cols-3 gap-2">
            {LENGTHS.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => props.setLength(l.label)}
                className={cn(
                  'flex flex-col items-center py-2.5 px-2 rounded-xl border text-center transition-all duration-150',
                  props.length === l.label
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-600 border-indigo-600 text-white shadow-md shadow-indigo-200/60 scale-[1.02]'
                    : 'bg-gray-50/80 border-gray-100 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50'
                )}
              >
                <span className="text-[11px] font-bold mb-0.5 tracking-widest opacity-70">{l.icon}</span>
                <span className="text-xs font-bold">{l.label}</span>
                <span className="text-[9px] opacity-70 mt-0.5">{l.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audience + Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
          <SectionLabel icon={Users} label="Target Audience" />
          <Input
            value={props.audience}
            onChange={(e) => props.setAudience(e.target.value)}
            placeholder="e.g. Product Managers & Tech Founders"
          />
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
          <SectionLabel icon={Target} label="Primary Goal" />
          <Select value={props.goal} onChange={(e) => props.setGoal(e.target.value)}>
            {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
          </Select>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-xs hover:shadow-md transition-all">
        <SectionLabel icon={Lightbulb} label="Custom Formatting & Rules" />
        <Textarea
          value={props.instructions}
          onChange={(e) => props.setInstructions(e.target.value)}
          placeholder="e.g. Include a punchy hook, bullet points, no corporate buzzwords, end with an open question..."
          className="min-h-[80px] text-[14px]"
        />
        <p className="text-[11px] text-gray-400 mt-1">Optional – guides tone, structure, and constraints.</p>
      </div>
    </div>
  );
}
