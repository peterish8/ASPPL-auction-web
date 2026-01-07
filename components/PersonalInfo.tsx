import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SubmissionSchema } from '@/lib/validation';
import { Input } from './ui/Input';

interface PersonalInfoProps {
  register: UseFormRegister<SubmissionSchema>;
  errors: FieldErrors<SubmissionSchema>;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ register, errors }) => {
  return (
    <div className="mb-20">
        <div className="flex items-center gap-6 bg-slate-800/50 p-6 rounded-xl mb-10 border border-slate-700/50">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-900/20">
                <span className="text-2xl lg:text-3xl font-bold text-white">1</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-white">
                Personal Information
            </h2>
        </div>

        <div className="space-y-8 lg:space-y-10">
            <Input
                label="Phone Number"
                {...register("phone_number")}
                error={errors.phone_number?.message}
                placeholder="Enter 10-digit phone number"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                helperText="Whole numbers only"
            />
            <Input
                label="Name"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Enter your full name"
                required
            />
        </div>
    </div>
  );
};
