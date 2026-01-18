import React from 'react';
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import { SubmissionSchema } from '@/lib/validation';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { DropdownItem } from '@/types/booking';

interface TradeDetailsProps {
  register: UseFormRegister<SubmissionSchema>;
  control: Control<SubmissionSchema>;
  errors: FieldErrors<SubmissionSchema>;
  options: {
    details: DropdownItem[];
    type: DropdownItem[];
    depot: DropdownItem[];
  };
}

export const TradeDetails: React.FC<TradeDetailsProps> = ({ register, control, errors, options }) => {
  return (
    <div className="mt-20 lg:mt-32">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 bg-slate-700/50 p-4 lg:p-6 rounded-xl mb-10 border border-slate-600/50">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/20">
                <span className="text-xl lg:text-2xl font-bold text-white">2</span>
            </div>
            <h2 className="text-xl lg:text-3xl font-bold text-white">
                Trade Details
            </h2>
        </div>

        <div className="space-y-8 lg:space-y-10">
            <Controller
                name="details"
                control={control}
                render={({ field }) => (
                    <Select
                        label="Details / விவரங்கள் / വിവരങ്ങൾ"
                        options={options.details}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.details?.message}
                        required
                        placeholder="Select details..."
                    />
                )}
            />
            
            <Input
                label="Weight (kg) / எடை (கிலோ) / ഭാരം (കിലോ)"
                {...register("weight")}
                error={errors.weight?.message}
                placeholder="Enter weight in kg"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                helperText="Whole numbers only"
            />
            
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <Select
                        label="Type / வகை / തരം"
                        options={options.type}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.type?.message}
                        required
                        placeholder="Select type..."
                    />
                )}
            />
            
            <Controller
                name="depot"
                control={control}
                render={({ field }) => (
                    <Select
                        label="Depot / டிப்போ / ഡിപ്പോ"
                        options={options.depot}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.depot?.message}
                        required
                        placeholder="Select depot..."
                    />
                )}
            />
        </div>
    </div>
  );
};
