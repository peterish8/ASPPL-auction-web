import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownItem } from '@/types/booking';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: DropdownItem[];
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, required, placeholder = "Select...", ...props }, ref) => {
    return (
      <div className="space-y-3">
        <label className="block text-base lg:text-lg font-semibold text-slate-300 uppercase tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          <select
            className={cn(
              "w-full h-14 lg:h-16 px-6 lg:px-8 py-4 lg:py-5",
              "text-lg lg:text-xl text-slate-200",
              "bg-slate-950/60 border-2 border-slate-700",
              "rounded-xl",
              "focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20",
              "appearance-none cursor-pointer",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            ref={ref}
            defaultValue=""
            {...props}
          >
            <option value="" disabled className="bg-slate-900 text-slate-500">
              {placeholder}
            </option>
            {options.map((option) => (
              <option 
                key={option.id} 
                value={option.label}
                className="bg-slate-900 text-slate-200 py-2"
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom Arrow Icon */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
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
Select.displayName = "Select";
