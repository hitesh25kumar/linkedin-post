import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

type Color = 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  color: Color;
}

const COLOR_MAP: Record<Color, { bg: string; icon: string; badge: string }> = {
  indigo:  { bg: 'bg-indigo-50',  icon: 'text-indigo-600',  badge: 'bg-indigo-100 text-indigo-700' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-600',   badge: 'bg-amber-100 text-amber-700' },
  violet:  { bg: 'bg-violet-50',  icon: 'text-violet-600',  badge: 'bg-violet-100 text-violet-700' },
  rose:    { bg: 'bg-rose-50',    icon: 'text-rose-600',    badge: 'bg-rose-100 text-rose-700' },
};

export function StatCard({ label, value, subtext, icon: Icon, color }: StatCardProps) {
  const c = COLOR_MAP[color];
  return (
    <div className="card-glow bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', c.bg)}>
          <Icon className={cn('w-5 h-5', c.icon)} />
        </div>
        <span className={cn('badge-pill text-[10px]', c.badge)}>{subtext}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
      <p className="text-xs font-medium text-gray-500">{label}</p>
    </div>
  );
}
