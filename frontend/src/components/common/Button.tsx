import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const VARIANTS = {
  primary:   'btn-gradient text-white font-semibold',
  secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold border border-indigo-100',
  outline:   'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-medium shadow-sm',
  ghost:     'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium',
  danger:    'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-medium',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-sm rounded-xl gap-2',
};

export function Button({ variant = 'primary', size = 'md', isLoading, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
