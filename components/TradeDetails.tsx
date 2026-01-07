import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SubmissionSchema } from '@/lib/validation';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { DropdownItem } from '@/types/booking';

interface TradeDetailsProps {
  register: UseFormRegister<SubmissionSchema>;
  errors: FieldErrors<SubmissionSchema>;
  options: {
    details: DropdownItem[];
    type: DropdownItem[];
    depot: DropdownItem[];
  };
}

export const TradeDetails: React.FC<TradeDetailsProps> = ({ register, errors, options }) => {
  return (
    <div className="mt-20 lg:mt-32">
        <div className="flex items-center gap-6 bg-slate-700/50 p-6 rounded-xl mb-10 border border-slate-600/50">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-900/20">
                <span className="text-2xl lg:text-3xl font-bold text-white">2</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-white">
                Trade Details
            </h2>
        </div>

        <div className="space-y-8 lg:space-y-10">
            <Select
                label="Details"
                options={options.details}
                {...register("details")}
                error={errors.details?.message}
                required
                placeholder="Select details..."
            />
            
            <Input
                label="Weight (kg)"
                {...register("weight")}
                error={errors.weight?.message}
                placeholder="Enter weight in kg"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                helperText="Whole numbers only"
            />
            
            <Select
                label="Type"
                options={options.type}
                {...register("type")}
                error={errors.type?.message}
                required
                placeholder="Select type..."
            />
            
            <Select
                label="Depot"
                options={options.depot}
                {...register("depot")}
                error={errors.depot?.message}
                required
                placeholder="Select depot..."
            />
        </div>
    </div>
  );
};
