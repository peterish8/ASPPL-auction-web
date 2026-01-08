import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const params = await searchParams;
  // keeping this for potential future use or analytics
  const submissionId = params.id ? params.id.slice(0, 8).toUpperCase() : 'UNKNOWN';

  // Fetch submission timestamp
  let dateDisplay = null;
  let dayDisplay = null;

  try {
     if (params.id) {
         const { data, error } = await supabase
            .from('submissions')
            .select('created_at')
            .eq('id', params.id)
            .single();
         
         if (data?.created_at) {
             const date = new Date(data.created_at);
             // Convert to IST (UTC + 5:30)
             const istOffset = 5.5 * 60 * 60 * 1000;
             const istTime = new Date(date.getTime() + istOffset);
             
             const day = istTime.getUTCDate().toString().padStart(2, '0');
             const month = (istTime.getUTCMonth() + 1).toString().padStart(2, '0');
             const year = istTime.getUTCFullYear();
             
             const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
             dayDisplay = days[istTime.getUTCDay()];
             dateDisplay = `${day}-${month}-${year}`;
         }
     }
  } catch (e) {
      console.error("Date fetch error", e);
  }
  
  // Fallback if no date found (optional, or just don't show)
  if (!dateDisplay) {
      const now = new Date();
      // Calculate IST for now as fallback
       const istOffset = 5.5 * 60 * 60 * 1000;
       // now.getTime() is UTC. To represent IST components via getUTC methods:
       const istTime = new Date(now.getTime() + istOffset);
       
       const day = istTime.getUTCDate().toString().padStart(2, '0');
       const month = (istTime.getUTCMonth() + 1).toString().padStart(2, '0');
       const year = istTime.getUTCFullYear();
       const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
       
       dateDisplay = `${day}-${month}-${year}`;
       dayDisplay = days[istTime.getUTCDay()];
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-4 lg:py-16">
        <div className="flex flex-col items-center justify-start pt-16 lg:pt-0 lg:justify-center lg:min-h-[500px] px-4 sm:px-6">
          
          {/* Success Header Lockup */}
          <div className="flex flex-row lg:flex-col items-center gap-6 lg:gap-8 mb-8 lg:mb-12 w-full max-w-md lg:max-w-none justify-center lg:justify-center">
            {/* Success Icon */}
            <div className="w-16 h-16 lg:w-32 lg:h-32 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 shadow-2xl shadow-green-900/40 animate-pulse">
              <svg className="w-8 h-8 lg:w-16 lg:h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success Message */}
            <div className="text-left lg:text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
                Submission Successful!
              </h2>
              <p className="text-sm lg:text-xl text-slate-400 max-w-xs lg:max-w-md">
                Your entry is updated, our depot manager will reach out to you for any clarification
              </p>
              
              {/* Date Display */}
              <div className="mt-4 flex flex-wrap gap-3 lg:justify-center">
                  <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium">
                      📅 {dateDisplay}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium">
                      🕒 {dayDisplay}
                  </div>
              </div>
            </div>
          </div>
          
          
          {/* Info Note */}
          <div className="flex items-start gap-3 lg:gap-4 p-4 lg:p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl max-w-md w-full">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col gap-1">
                <p className="text-sm text-blue-300 text-left leading-relaxed">
                You have completed your submission for this week.
                </p>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-12">
            <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
                ← Return to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
