import { cn } from '../../utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => (
  <input
    className={cn('input-modern', className)}
    {...props}
  />
);
