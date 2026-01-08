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
  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
        // Parse YYYY-MM-DD to avoid timezone issues with Date() constructor
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1; 
            const day = parseInt(parts[2]);
            
            const date = new Date(year, month, day);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[date.getDay()];
            
            return `${parts[2]}-${parts[1]}-${parts[0]}   |   ${dayName}`;
        }
        return dateString;
    } catch (e) {
        return dateString;
    }
  };

  const displayDate = formatDate(tradeDate);
  return (
    <header 
      className="relative z-50 px-5 py-5 lg:px-16 lg:py-6 overflow-hidden shadow-2xl"
      style={{
        background: `
          /* Subtle Vignette Top Layer */
          radial-gradient(
            circle at 50% 50%, 
            transparent 60%, 
            rgba(0, 0, 0, 0.2) 100%
          ),
          /* Smooth Top Light */
          radial-gradient(
            100% 140% at 50% -20%, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.01) 50%, 
            transparent 80%
          ),
          /* Base Smooth Gradient */
          linear-gradient(
            180deg,
            #059669 0%,   
            #047857 45%,  
            #064e3b 100%  
          )
        `
      }}
    >
      {/* Bottom Glow Separator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-400 to-transparent opacity-50 shadow-[0_0_12px_#34d399]" />


      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-row items-start gap-4 lg:gap-6 mb-4 lg:mb-5">
          {/* Logo */}
          <div className="relative w-24 h-24 lg:w-28 lg:h-28 shrink-0 bg-white rounded-2xl flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-xl">
             <Image 
               src="/logo.png" 
               alt="ASPPL Logo" 
               fill
               className="object-contain p-1.5"
               priority
             />
          </div>
          
          {/* Title & Subtitle */}
          <div className="flex flex-col pt-2 bg-transparent">
            <h1 className="text-2xl lg:text-4xl font-bold text-[#E6FFF6] leading-tight drop-shadow-sm">
              Amazing Spice Park <br className="block sm:hidden" /> Private Limited
            </h1>
            <p className="text-[#2EE6A6] text-sm lg:text-xl font-medium mt-1 uppercase tracking-wide opacity-90">
              Trade Booking System
            </p>
            
            {/* Unified Trade Info Container */}
            {tradeNumber && tradeDate && (
              <div className="hidden lg:flex w-fit mt-4 bg-[#041d18]/40 backdrop-blur-md border border-[#2EE6A6]/30 rounded-2xl p-1.5 items-center shadow-lg">
                 <div className="px-5 py-2 rounded-xl bg-[#041d18]/60 flex items-center gap-3">
                    <span className="text-[#9EDAC6] text-xs font-bold uppercase tracking-wider">Trade Number:</span>
                    <span className="text-white text-base font-bold tracking-wide">{tradeNumber}</span>
                 </div>
                 <div className="w-px h-8 bg-[#2EE6A6]/30 mx-1" />
                 <div className="px-5 py-2 rounded-xl bg-[#041d18]/60 flex items-center gap-3">
                    <span className="text-[#9EDAC6] text-xs font-bold uppercase tracking-wider">Trade Date:</span>
                    <span className="text-white text-base font-bold tracking-wide">{displayDate}</span>
                 </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Separate Container (visible only on small screens) */}
        {tradeNumber && tradeDate && (
          <div className="lg:hidden flex flex-col gap-2">
             <div className="bg-[#041d18]/60 backdrop-blur-md border border-[#2EE6A6]/20 px-4 py-3 rounded-lg flex items-center justify-between shadow-lg">
                <span className="text-[#9EDAC6] text-xs font-bold uppercase tracking-wider">Trade Number:</span>
                <span className="text-white text-sm font-bold tracking-wide">{tradeNumber}</span>
             </div>
             <div className="bg-[#041d18]/60 backdrop-blur-md border border-[#2EE6A6]/20 px-4 py-3 rounded-lg flex items-center justify-between shadow-lg">
                <span className="text-[#9EDAC6] text-xs font-bold uppercase tracking-wider">Trade Date:</span>
                <span className="text-white text-sm font-bold tracking-wide">{displayDate}</span>
             </div>
          </div>
        )}
      </div>
    </header>
  );
};
