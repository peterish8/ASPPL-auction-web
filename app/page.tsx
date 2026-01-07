import { Header } from '@/components/Header';
import { BookingForm } from '@/components/BookingForm';
import { PoolingSchedule } from '@/components/PoolingSchedule';
import { supabase } from '@/lib/supabase';
import { Trade, PoolingScheduleItem, DropdownItem } from '@/types/booking';

export const dynamic = 'force-dynamic';

async function getTradeData() {
  try {
     // Fetch active trade
     const { data: trade } = await supabase.from('trades').select('*').eq('is_active', true).maybeSingle();
     
     if (!trade) return { trade: null, locations: [], options: null };

     // Fetch pooling schedule (new table name: pooling_schedule)
     // Note: The user schema has 'trade_id' in pooling_schedule? The prompt says: "trade_id", "location", "pooling_date".
     const { data: locations } = await supabase.from('pooling_schedule').select('*').eq('trade_id', trade.id).order('order_index');
     
     // Fetch all dropdowns (new table name: dropdowns)
     const { data: allDropdowns } = await supabase.from('dropdowns').select('*').eq('is_active', true).order('order_index');

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
        }
     };
  } catch (e) {
      console.error("Error fetching data", e);
      return { trade: null, locations: [], options: null };
  }
}

export default async function Home() {
  const { trade, locations, options } = await getTradeData();

  if (!trade || !options) {
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
          <Header /> 
          <div className="flex flex-col items-center justify-center h-[50vh] px-4 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-300 mb-2">No Active Trade</h2>
              <p className="text-slate-400 max-w-sm">
                  There is currently no active trade scheduled. Please check back later.
              </p>
          </div>
        </div>
    );
  }

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
