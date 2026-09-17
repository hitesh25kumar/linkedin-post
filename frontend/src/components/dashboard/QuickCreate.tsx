import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const PROMPTS = [
  'How AI is changing Product Management...',
  "The most underrated leadership skill I've learned...",
  '3 things I wish I knew when starting my career...',
  'Why remote teams outperform in-office teams...',
];

export function QuickCreate() {
  const [topic, setTopic] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (topic.trim()) {
      navigate('/create', { state: { topic } });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/80 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <h2 className="text-base font-bold text-gray-900">Quick Create</h2>
      </div>
      <p className="text-xs text-gray-400 mb-4">Describe your idea. AI handles the rest.</p>

      <div className={`relative flex-1 flex flex-col rounded-xl border-2 transition-all duration-200 ${focused ? 'border-indigo-400 bg-white shadow-sm shadow-indigo-100' : 'border-gray-100 bg-gray-50/80'}`}>
        <textarea
          className="flex-1 w-full bg-transparent px-4 pt-3 pb-2 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none leading-relaxed min-h-[120px]"
          placeholder={`e.g. ${PROMPTS[Math.floor(Math.random() * PROMPTS.length)]}`}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' && e.metaKey) handleGenerate(); }}
        />
        <div className="px-4 py-2 flex items-center justify-between border-t border-gray-100">
          <span className="text-[10px] text-gray-400">{topic.length > 0 ? `${topic.length} chars` : '⌘↵ to generate'}</span>
          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white btn-gradient disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Generate
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Inspiration</p>
        <div className="flex flex-wrap gap-1.5">
          {['Leadership insight', 'Career lesson', 'AI & tech', 'Product story'].map((chip) => (
            <button
              key={chip}
              onClick={() => setTopic(chip + ': ')}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
