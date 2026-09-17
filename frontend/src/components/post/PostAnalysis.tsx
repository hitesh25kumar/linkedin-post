import { CheckCircle2, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PostAnalysisProps {
  metrics?: {
    hook: number;
    clarity: number;
    value: number;
    authenticity: number;
    engagement: number;
  };
  analysis?: {
    works: string[];
    improve: string[];
  };
}

const METRIC_LABELS: Record<string, string> = {
  hook: 'Hook Strength',
  clarity: 'Clarity',
  value: 'Value Add',
  authenticity: 'Authenticity',
  engagement: 'Engagement',
};

function getBarColor(score: number) {
  if (score >= 9) return 'from-emerald-400 to-emerald-500';
  if (score >= 7) return 'from-indigo-400 to-violet-500';
  return 'from-amber-400 to-orange-400';
}

function getScoreLabel(avg: number) {
  if (avg >= 9) return { label: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  if (avg >= 7) return { label: 'Good', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
  return { label: 'Fair', color: 'text-amber-600 bg-amber-50 border-amber-200' };
}

export function PostAnalysis({ metrics, analysis }: PostAnalysisProps) {
  if (!metrics || !analysis) return null;

  const entries = Object.entries(metrics) as [string, number][];
  const avg = Math.round(entries.reduce((sum, [, v]) => sum + v, 0) / entries.length * 10) / 10;
  const scoreInfo = getScoreLabel(avg);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-6 space-y-6">
      {/* Header with overall score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base font-bold text-gray-900">AI Quality Analysis</h2>
        </div>
        <div className={cn('badge-pill border text-sm font-bold', scoreInfo.color)}>
          {avg}/10 · {scoreInfo.label}
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3.5">
        {entries.map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-gray-600">{METRIC_LABELS[key] ?? key}</span>
              <span className="text-xs font-bold text-gray-900">{value}<span className="text-gray-400 font-normal">/10</span></span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out', getBarColor(value))}
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
          <h3 className="text-xs font-bold text-emerald-900 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            What works
          </h3>
          <ul className="space-y-1.5">
            {analysis.works.map((item, i) => (
              <li key={i} className="text-xs text-emerald-800 flex gap-1.5 leading-relaxed">
                <TrendingUp className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-100">
          <h3 className="text-xs font-bold text-amber-900 mb-2.5 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Could improve
          </h3>
          <ul className="space-y-1.5">
            {analysis.improve.map((item, i) => (
              <li key={i} className="text-xs text-amber-800 flex gap-1.5 leading-relaxed">
                <span className="text-amber-400 shrink-0 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
