import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, ...props }, ref) => {
    return (
      <div className="space-y-3">
        <label className="block text-base lg:text-lg font-semibold text-slate-300 uppercase tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <input
          className={cn(
            "w-full h-14 lg:h-16 px-6 lg:px-8 py-4 lg:py-5",
            "text-lg lg:text-xl text-slate-200",
            "bg-slate-950/60 border-2 border-slate-700",
            "rounded-xl",
            "focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20",
            "placeholder:text-slate-600",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "read-only:opacity-75 read-only:cursor-default",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          ref={ref}
          {...props}
        />
        
        {error && (
          <div className="flex items-center gap-2 mt-2 text-sm text-red-400">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {!error && helperText && (
          <p className="text-sm text-slate-400 mt-2">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
