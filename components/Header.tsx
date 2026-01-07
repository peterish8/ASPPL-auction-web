import React from 'react';

interface HeaderProps {
  tradeNumber?: string;
  tradeDate?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  tradeNumber,
  tradeDate
}) => {
  return (
    <header className="bg-gradient-to-r from-emerald-900 to-emerald-800 px-5 py-8 lg:px-16 lg:py-10 shadow-xl relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 lg:mb-8">
          {/* Logo Placeholder */}
          <div className="w-12 h-12 lg:w-20 lg:h-20 shrink-0 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
             {/* <img src="/logo.png" alt="ASPPL Logo" className="w-full h-full object-cover" /> */}
             <span className="text-lg lg:text-2xl font-bold text-emerald-400">AP</span>
          </div>
          
          <div>
            <h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight">
              Amazing Spice Park Private Limited
            </h1>
          </div>
        </div>
        
        {tradeNumber && tradeDate && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl flex items-center gap-3 shadow-lg">
              <span className="text-slate-400 text-xs lg:text-sm font-medium uppercase tracking-wider">Trade Number:</span>
              <span className="text-white text-base lg:text-xl font-bold tracking-wide">{tradeNumber}</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-2 lg:px-6 lg:py-3 rounded-lg lg:rounded-xl flex items-center gap-3 shadow-lg">
              <span className="text-slate-400 text-xs lg:text-sm font-medium uppercase tracking-wider">Trade Date:</span>
              <span className="text-white text-base lg:text-xl font-bold tracking-wide">{tradeDate}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
