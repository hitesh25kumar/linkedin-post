import { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useToastStore, type Toast } from '../../store/toastStore';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, onRemove]);

  const STYLES = {
    success: { bg: 'bg-emerald-600', icon: <CheckCircle2 className="w-4 h-4 text-white" /> },
    error:   { bg: 'bg-rose-600',    icon: <AlertCircle  className="w-4 h-4 text-white" /> },
    info:    { bg: 'bg-indigo-600',  icon: <Info         className="w-4 h-4 text-white" /> },
  };

  const s = STYLES[toast.type];

  return (
    <div className={cn(
      'pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-[360px] px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg shadow-black/15 animate-in',
      s.bg
    )}>
      {s.icon}
      <span className="flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="ml-1 p-0.5 rounded hover:bg-white/20 transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
