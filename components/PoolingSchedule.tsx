import React from 'react';
import { PoolingScheduleItem } from '@/types/booking';

interface PoolingScheduleProps {
  locations: PoolingScheduleItem[];
}

export const PoolingSchedule: React.FC<PoolingScheduleProps> = ({ locations }) => {
  return (
    <div className="w-full lg:sticky lg:top-8 lg:h-fit order-last lg:order-none mt-8 lg:mt-0">
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-800 p-6 lg:p-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-white">
            Pooling Schedule
          </h3>
        </div>
        
        {/* Location List */}
        <div className="space-y-6">
          {locations.map((location, index) => (
            <div key={location.id || index} 
                 className="flex items-center justify-between p-5 lg:p-6 
                            bg-slate-800/50 rounded-xl border border-slate-700
                            hover:border-emerald-600/50 transition-colors duration-200">
              
              {/* Location Name */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-emerald-400">
                    {String.fromCharCode(65 + index)} {/* A, B, C... */}
                  </span>
                </div>
                <span className="text-lg lg:text-xl font-semibold text-slate-200">
                  {location.location}
                </span>
              </div>
              
              {/* Date */}
              <span className="text-base lg:text-lg font-medium text-emerald-400 whitespace-nowrap">
                {location.pooling_date}
              </span>
            </div>
          ))}
          {locations.length === 0 && (
             <div className="text-slate-500 text-center py-4">No pooling locations scheduled.</div>
          )}
        </div>
        
      </div>
    </div>
  );
};
