import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const STEPS = [
  { label: 'Understanding your topic', icon: '🧠' },
  { label: 'Finding the right angle', icon: '🎯' },
  { label: 'Crafting your first draft', icon: '✍️' },
  { label: 'Reviewing for quality', icon: '🔍' },
  { label: 'Polishing the final post', icon: '✨' },
];

export function GenerationProgress() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 98));
    }, 80);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center w-full">
      {/* Animated orb */}
      <div className="relative mb-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-300/40">
          <div className="text-3xl animate-pulse">🤖</div>
        </div>
        {/* Orbiting ring */}
        <div className="absolute -inset-3 rounded-full border-4 border-transparent border-t-indigo-400 border-r-violet-400 animate-spin" />
        <div className="absolute -inset-5 rounded-full border-2 border-transparent border-b-indigo-200 border-l-violet-200 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1">AI is writing your post</h3>
      <p className="text-sm text-gray-400 mb-8">This only takes a few seconds...</p>

      {/* Progress bar */}
      <div className="w-full max-w-xs mb-8">
        <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 w-full max-w-xs text-left">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.label}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500',
                isCompleted ? 'bg-emerald-50/60 text-emerald-700' :
                isCurrent   ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' :
                              'text-gray-300'
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              ) : (
                <span className={cn('text-sm shrink-0', isCurrent && 'animate-pulse')}>{step.icon}</span>
              )}
              <span className={cn(
                'text-xs font-semibold transition-all',
                isCurrent ? 'text-indigo-700' : isCompleted ? 'text-emerald-700' : 'text-gray-300'
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
