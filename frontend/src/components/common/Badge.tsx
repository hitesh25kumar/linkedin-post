import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const VARIANTS = {
  default: 'bg-gray-100 text-gray-700 border border-gray-200',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger:  'bg-rose-50 text-rose-700 border border-rose-200',
  info:    'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('badge-pill', VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
