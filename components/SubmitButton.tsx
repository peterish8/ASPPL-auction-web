import React from 'react';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ className, isLoading, disabled, ...props }) => {
  return (
    <div className="mt-16 lg:mt-24 flex justify-center">
      <button
        type="submit"
        disabled={disabled || isLoading}
        className={cn(
          "w-full max-w-md h-16 lg:h-20",
          "text-xl lg:text-2xl font-bold text-white",
          "bg-linear-to-r from-emerald-600 to-emerald-500",
          "hover:from-emerald-500 hover:to-emerald-400",
          "rounded-xl shadow-xl hover:shadow-2xl",
          "transform hover:scale-[1.02] active:scale-[0.98]",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none",
          "flex items-center justify-center gap-3",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          "Submit Entry"
        )}
      </button>
    </div>
  );
};
