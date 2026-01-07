import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DropdownItem } from '@/types/booking';

interface SelectProps {
  label: string;
  options: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, label, options, value, onChange, error, helperText, required, placeholder = "Select...", disabled, name }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.label === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      if (onChange) {
        onChange(optionValue);
      }
      setIsOpen(false);
    };

    return (
      <div className="space-y-3" ref={containerRef}>
        <label className="block text-base lg:text-lg font-semibold text-slate-300 uppercase tracking-wide">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <div className="relative">
          {/* Main Button */}
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              "w-full h-14 lg:h-16 px-6 lg:px-8 py-4 lg:py-5 text-left",
              "text-lg lg:text-xl",
              value ? "text-slate-200" : "text-slate-500",
              "bg-slate-950/60 border-2",
              error ? "border-red-500" : isOpen ? "border-emerald-500 ring-4 ring-emerald-500/20" : "border-slate-700",
              "rounded-xl",
              "transition-all duration-200",
              "flex items-center justify-between",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
            ref={ref} // For scrolling into view if needed
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            
            {/* Arrow Icon */}
            <svg 
              className={cn(
                "w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0",
                isOpen && "rotate-180"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top">
              <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {options.length > 0 ? (
                  options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.label)}
                      className={cn(
                        "w-full px-6 py-4 text-left text-lg transition-colors duration-150",
                        "hover:bg-emerald-600/20 hover:text-emerald-400",
                        option.label === value ? "bg-emerald-600/10 text-emerald-500 font-semibold" : "text-slate-300"
                      )}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="px-6 py-4 text-slate-500 text-center">No options available</div>
                )}
              </div>
            </div>
          )}
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
