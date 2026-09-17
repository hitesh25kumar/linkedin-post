import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ className, children, ...props }: SelectProps) => (
  <div className="relative">
    <select
      className={cn(
        'input-modern appearance-none pr-9 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  </div>
);
