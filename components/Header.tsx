import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  tradeNumber?: string;
  tradeDate?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  tradeNumber,
  tradeDate
}) => {
  return (
    <header className="bg-linear-to-r from-emerald-900 to-emerald-800 px-5 py-5 lg:px-16 lg:py-6 shadow-xl relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-row items-center gap-4 lg:gap-6 mb-4 lg:mb-5">
          {/* Logo */}
          <div className="relative w-10 h-10 lg:w-14 lg:h-14 shrink-0 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-md">
             <Image 
               src="/logo.png" 
               alt="ASPPL Logo" 
               fill
               className="object-contain p-1"
               priority
             />
          </div>
          
          {/* Title */}
          {/* Title & Subtitle */}
          <div className="flex flex-col">
            <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
              Amazing Spice Park <br className="block sm:hidden" /> Private Limited
            </h1>
            <p className="text-emerald-200 text-sm lg:text-xl font-medium mt-1 uppercase tracking-wide">
              Trade Booking System
            </p>
          </div>
        </div>
        
        {tradeNumber && tradeDate && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg flex items-center gap-2 shadow-lg">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Trade Number:</span>
              <span className="text-white text-sm lg:text-base font-bold tracking-wide">{tradeNumber}</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg flex items-center gap-2 shadow-lg">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Trade Date:</span>
              <span className="text-white text-sm lg:text-base font-bold tracking-wide">{tradeDate}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
