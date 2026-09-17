import type { Template } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

const GRADIENT_PAIRS = [
  'from-indigo-500 to-violet-500',
  'from-violet-500 to-purple-500',
  'from-blue-500 to-indigo-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-rose-500 to-pink-500',
];

export function TemplateCard({ template, index = 0 }: TemplateCardProps & { index?: number }) {
  const navigate = useNavigate();
  const gradient = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];

  const handleUseTemplate = () => {
    navigate('/create', {
      state: {
        topic: `[Template: ${template.name}]\n\n`,
        instructions: template.instructions,
      },
    });
  };

  // Get initials from name for the icon
  const initials = template.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="card-glow bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Card top color band */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-200/40`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm leading-snug">{template.name}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full uppercase tracking-wide">
            {template.tone}
          </span>
          <button
            onClick={handleUseTemplate}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group-hover:gap-2"
          >
            Use template
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
