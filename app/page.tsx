import { Header } from '@/components/Header';
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

     // ... (rest of fetching)
     const { data: locations, error: locError } = await supabase.from('pooling_schedule').select('*').eq('trade_id', trade.id).order('order_index');
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
        <div className="min-h-screen bg-slate-950 pb-20">
          <Header /> 
          <div className="flex flex-col items-center justify-center h-[50vh] px-4 text-center">
              {/* ... Icon ... */}
              <h2 className="text-2xl font-bold text-slate-300 mb-2">No Active Trade</h2>
              <p className="text-slate-400 max-w-sm mb-4">
                  There is currently no active trade scheduled. Please check back later.
              </p>
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm font-mono mt-4">
                    <p className="font-bold">Error Details:</p>
                    {error}
                </div>
              )}
          </div>
        </div>
    );
  }
  // ...

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <Header tradeNumber={trade.trade_number} tradeDate={trade.trade_date} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-20">
          {/* Form Card */}
          <BookingForm trade={trade} options={options} />
          
          {/* Schedule Card */}
          <PoolingSchedule locations={locations} />
        </div>
      </div>
    </div>
  );
}
