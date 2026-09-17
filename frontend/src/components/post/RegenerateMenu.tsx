import { useState } from 'react';
import { RefreshCw, ChevronDown } from 'lucide-react';

interface RegenerateMenuProps {
  onRegenerate: (reason: string) => void;
}

const REASONS = [
  { label: 'Stronger hook', icon: '🎣' },
  { label: 'More conversational', icon: '💬' },
  { label: 'More professional', icon: '💼' },
  { label: 'Make it shorter', icon: '✂️' },
  { label: 'Add more detail', icon: '📝' },
  { label: 'More practical', icon: '🔧' },
  { label: 'More thought-provoking', icon: '🧠' },
  { label: 'Add storytelling', icon: '📖' },
  { label: 'Remove AI-sounding language', icon: '🚫' },
];

export function RegenerateMenu({ onRegenerate }: RegenerateMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Regenerate
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 bottom-full mb-2 w-60 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2 z-50 animate-scale-in">
            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Regenerate because...</p>
            {REASONS.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => { onRegenerate(label); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <span className="text-base">{icon}</span>
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
