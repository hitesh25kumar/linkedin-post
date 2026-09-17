import { cn } from '../../utils/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={cn('input-modern resize-none', className)}
    {...props}
  />
);
