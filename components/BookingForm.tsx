"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema, SubmissionSchema } from '@/lib/validation';
import { PersonalInfo } from './PersonalInfo';
import { TradeDetails } from './TradeDetails';
import { SubmitButton } from './SubmitButton';
import { DropdownItem, Trade } from '@/types/booking';
import { getDeviceFingerprint } from '@/lib/fingerprint';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface BookingFormProps {
  trade: Trade;
  options: {
    details: DropdownItem[];
    type: DropdownItem[];
    depot: DropdownItem[];
  };
}

export const BookingForm: React.FC<BookingFormProps> = ({ trade, options }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SubmissionSchema>({
    resolver: zodResolver(submissionSchema) as any,
    mode: "onChange"
  });

  // State for re-submission warning
  const [isWarningMode, setIsWarningMode] = useState(false);

  const onSubmit = async (data: SubmissionSchema) => {
    // Check if user has already submitted for this trade (Local Check)
    const storageKey = `submitted_${trade.trade_number}`;
    const hasSubmitted = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : false;

    // If submitted and not yet acknowledged warning
    if (hasSubmitted && !isWarningMode) {
        setIsWarningMode(true);
        // Scroll to button or ensure visibility?
        // Usually button label change is enough
        return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const fingerprint = await getDeviceFingerprint();
      
      const { data: submission, error } = await supabase
        .from('submissions')
        .insert({
            trade_number: trade.trade_number,
            phone_number: data.phone_number,
            name: data.name,
            details: data.details,
            weight: data.weight,
            type: data.type,
            depot: data.depot,
            device_fingerprint: fingerprint
        })
        .select()
        .single();

      if (error) {
         // Even if we allow duplicates, handle unexpected errors
         // If constraint still exists, it will throw 23505
        if (error.code === '23505') { 
            // Fallback if SQL script wasn't run: Show error but maybe different text?
            // "You have already submitted." 
            // The user wanted to ALLOW it, so this error shouldn't happen if they run the script.
            setSubmitError("System limit: Only one submission allowed per phone number.");
        } else {
            throw error;
        }
      } else {
        // Success
        localStorage.setItem(storageKey, 'true');
        const sub = submission as any;
        router.push(`/success?id=${sub.id}`);
      }

    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
      // Don't reset warning mode here, so if it fails they stay in flow? 
      // Or reset it? If failed, maybe reset.
      // If success -> redirected.
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-800 p-8 lg:p-16">
       <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfo register={register} errors={errors} />
          <TradeDetails register={register} control={control} errors={errors} options={options} />
          
          {submitError && (
             <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200">
               <svg className="w-6 h-6 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
               {submitError}
             </div>
          )}

          {/* Warning Message Box */}
          {isWarningMode && (
             <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-3 text-yellow-200 animate-in fade-in slide-in-from-bottom-2">
               <svg className="w-6 h-6 shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
               <div>
                 <p className="font-bold">Duplicate Submission Detected</p>
                 <p className="text-sm opacity-90">You have already submitted an entry. Click Submit again to confirm.</p>
               </div>
             </div>
          )}

          <SubmitButton 
              isLoading={isSubmitting} 
              disabled={!isValid} 
              isWarning={isWarningMode}
          />
       </form>
    </div>
  );
};
