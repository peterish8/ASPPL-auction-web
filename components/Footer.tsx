import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react'; // Light-weight icons

export const Footer = () => {
  return (
    <footer className="relative mt-auto w-full z-10 overflow-hidden">
      
      {/* MAIN FOOTER BACKGROUND & CONTENT */}
      <div 
        className="relative w-full text-[#E6FFF6] pt-16 pb-8"
        style={{
          background: `
            radial-gradient(
              circle at 50% 0%, 
              rgba(46, 230, 166, 0.15) 0%, 
              rgba(6, 78, 59, 0.1) 40%, 
              transparent 80%
            ),
            linear-gradient(
              180deg,
              #064e3b 0%, 
              #022c22 100%
            )
          `
        }}
      >
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* COLUMN 1: COMPANY IDENTITY (Left) */}
            <div className="space-y-6 pt-4">
               <div className="flex items-start gap-5">
                  <div className="relative w-16 h-16 bg-white/95 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl shadow-emerald-900/50 shrink-0">
                      <Image 
                         src="/logo.png" 
                         alt="ASPPL Logo" 
                         fill
                         className="object-contain p-2"
                      />
                  </div>
                  <div className="space-y-2">
                      <h3 className="text-[#E6FFF6] font-extrabold text-xl leading-snug tracking-wide drop-shadow-sm">
                          Amazing Spice Park <br/> Private Limited
                      </h3>
                      <p className="text-[#2EE6A6] text-sm font-medium italic tracking-wide opacity-90">
                          "Built by Quality"
                      </p>
                  </div>
               </div>
               <p className="text-[#9EDAC6] text-sm leading-relaxed max-w-sm pl-1 opacity-90">
                  Redefining the spice trade with transparency and world-class infrastructure.
               </p>
            </div>

            {/* DARKER INNER PANEL for Columns 2 & 3 */}
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-[#041D18]/40 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#2EE6A6]/5 backdrop-blur-xs shadow-xl relative overflow-hidden">
              
              {/* COLUMN 2: REGISTERED OFFICE */}
              <div className="space-y-4 md:space-y-6 relative z-10">
                <h4 className="text-[#F4C95D] font-bold uppercase tracking-[0.15em] text-xs flex items-center gap-2 border-b border-[#F4C95D]/20 pb-2 w-fit">
                    <MapPin className="w-4 h-4" />
                    Registered Office
                </h4>
                <div className="space-y-4">
                    <p className="text-[#B6EAD9] text-sm leading-7 font-light">
                        Ward No. 6, Ellikkanam, Door No. 650, <br/>
                        Nedumkandam, Udumbanchola Taluk, <br/>
                        Idukki District - 685553, Kerala State.
                    </p>
                    
                    {/* CIN / GST CHIPS */}
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                        <div className="px-3 py-1.5 rounded-lg border border-[#2EE6A6]/20 bg-[#2EE6A6]/5 text-[#E6FFF6] flex items-center gap-2">
                            <span className="text-[#2EE6A6] font-bold">CIN:</span>
                            <span className="opacity-90">U46305KL2025PTC095544</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg border border-[#2EE6A6]/20 bg-[#2EE6A6]/5 text-[#E6FFF6] flex items-center gap-2">
                            <span className="text-[#2EE6A6] font-bold">GST:</span>
                            <span className="opacity-90">32ABDCA2636B1ZE</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* COLUMN 3: CONTACT INFORMATION */}
              <div className="space-y-4 md:space-y-6 relative z-10">
                 <h4 className="text-[#F4C95D] font-bold uppercase tracking-[0.15em] text-xs flex items-center gap-2 border-b border-[#F4C95D]/20 pb-2 w-fit">
                    <Phone className="w-4 h-4" />
                    Contact Us
                </h4>
                <div className="space-y-4">
                    {/* EMAIL PILL BUTTON */}
                    <a 
                        href="mailto:amazingspicepark@gmail.com" 
                        className="group flex items-center gap-3 p-1.5 pr-6 rounded-full bg-[#083A30] border border-[#2EE6A6]/20 hover:border-[#2EE6A6] transition-all duration-300 w-full md:w-fit"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0B3F34] flex items-center justify-center shrink-0 group-hover:bg-[#2EE6A6] group-hover:text-[#062A22] text-[#2EE6A6] transition-colors duration-300">
                            <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-[#E6FFF6] text-sm font-medium tracking-wide group-hover:text-white transition-colors break-all">
                            amazingspicepark@gmail.com
                        </span>
                    </a>
                    
                    {/* SUPPORT INFO */}
                     <div className="flex items-center gap-3 pl-2 pt-1 opacity-80">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2EE6A6] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2EE6A6]"></span>
                        </div>
                        <span className="text-[11px] text-[#2EE6A6] uppercase tracking-[0.2em] font-bold">Support Online</span>
                     </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* BOTTOM COPYRIGHT */}
          <div className="mt-8 lg:mt-16 pt-6 lg:pt-8 border-t border-[#E6FFF6]/10 flex items-center justify-start gap-6 text-xs text-[#9EDAC6]/60 font-light tracking-wide">
              <div className="flex items-center gap-6">
                  <p className="flex items-center gap-1.5 opacity-80">
                      <span>Designed by</span>
                      <span className="font-bold text-[#F4C95D] drop-shadow-sm">PTC</span>
                  </p>
              </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
