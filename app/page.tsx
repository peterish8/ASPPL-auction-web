import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { PoolingSchedule } from '@/components/PoolingSchedule';
import { supabase } from '@/lib/supabase';
import { Trade, PoolingScheduleItem, DropdownItem } from '@/types/booking';

export const dynamic = 'force-dynamic';

async function getTradeData() {
  try {
     const { data: trade, error: tradeError } = await supabase
       .from('trades')
       .select('*')
       .eq('is_active', true)
       .order('created_at', { ascending: false })
       .limit(1)
       .maybeSingle();
     
     if (tradeError) {
         console.error("Supabase Trade Error:", JSON.stringify(tradeError, null, 2));
         return { trade: null, locations: [], options: null, error: tradeError.message || JSON.stringify(tradeError) };
     }

     if (!trade) {
         console.log("No active trade found");
         return { trade: null, locations: [], options: null, error: "No active trade found in database." };
     }

     // Fetch pooling schedule
     const { data: locations, error: locError } = await supabase
        .from('pooling_schedule')
        .select('*')
        .eq('trade_id', trade.id)
        .order('order_index', { ascending: true });
        
     if (locError) console.error("Location Error:", locError);

     const { data: allDropdowns, error: dropError } = await supabase.from('dropdowns').select('*').eq('is_active', true).order('order_index');
     if (dropError) console.error("Dropdown Error:", dropError);

     // Filter dropdowns by category
     const details = allDropdowns?.filter((d: any) => d.category === 'details') || [];
     const type = allDropdowns?.filter((d: any) => d.category === 'type') || [];
     const depot = allDropdowns?.filter((d: any) => d.category === 'depot') || [];

     return {
        trade: trade as Trade,
        locations: (locations || []) as PoolingScheduleItem[],
        options: {
            details: details as DropdownItem[],
            type: type as DropdownItem[],
            depot: depot as DropdownItem[],
        },
        error: null
     };
  } catch (e: any) {
      console.error("Unexpected Error:", e);
      return { trade: null, locations: [], options: null, error: e.message || "Unexpected error" };
  }
}

export default async function Home() {
  const { trade, locations, options, error } = await getTradeData();

  if (!trade || !options) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
          <Header />
          <div className="grow flex flex-col items-center justify-center px-4 py-20 lg:py-32">
            
            {/* Premium Card Container */}
            <div className="max-w-lg w-full bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 lg:p-12 text-center shadow-2xl">
              
              {/* Header Row: Icon Left, Title Right */}
              <div className="flex items-center gap-4 mb-6">
                {/* Animated Icon */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-amber-500/20 rounded-full flex items-center justify-center animate-pulse shrink-0">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h1 className="text-xl lg:text-2xl font-bold text-white text-left">
                  Welcome to ASPPL Trade Booking
                </h1>
              </div>
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">No Active Trade</span>
              </div>
              
              {/* Message */}
              <p className="text-base lg:text-lg text-slate-400 leading-relaxed mb-8 max-w-md mx-auto">
                There are no trades scheduled at this time. Please check back once you receive a notification from our team about the next booking window.
              </p>
              
              {/* Divider */}
              <div className="w-16 h-px bg-slate-700 mx-auto mb-6"></div>
              
              {/* Signature */}
              <div className="text-sm text-slate-500 italic flex flex-col gap-1">
                <span>Thank you for your patience</span>
                <span className="font-semibold text-slate-400">— Team ASPPL</span>
              </div>
              
            </div>
            
            {/* Debug Error removed as per request */}
            
          </div>
          <Footer />
        </div>
    );
  }
  // ...

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Header tradeNumber={trade.trade_number} tradeDate={trade.trade_date} />
      
      <div className="grow max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-20">
          {/* Schedule Card - First on Mobile */}
          <div className="order-1 lg:order-2">
            <PoolingSchedule locations={locations} />
          </div>

          {/* Form Card - Second on Mobile */}
          <div className="order-2 lg:order-1">
             <BookingForm trade={trade} options={options} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
