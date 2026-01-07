import Link from 'next/link';
import { Header } from '@/components/Header';
import { supabase } from '@/lib/supabase';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const params = await searchParams;
  const submissionId = params.id ? params.id.slice(0, 8).toUpperCase() : 'UNKNOWN';

  // Fetch next opening date
  const { data: setting } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', 'next_opening_date')
    .maybeSingle();

  let nextDate = "To Be Announced";
  if (setting?.value) {
    const date = new Date(setting.value);
    if (!isNaN(date.getTime())) {
      // Format: 20 January 2026
      nextDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } else {
      nextDate = setting.value;
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6">
          
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
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">
                Submission Successful!
              </h2>
              <p className="text-sm lg:text-xl text-slate-400 max-w-xs lg:max-w-md">
                Your trade booking request has been submitted successfully.
              </p>
            </div>
          </div>
          

          {/* Next Opening Date Feature */}
          <div className="bg-linear-to-br from-indigo-900/40 to-slate-900/40 rounded-xl p-6 lg:p-8 mb-6 lg:mb-8 border border-indigo-500/30 w-full max-w-md backdrop-blur-md">
             <div className="flex items-center justify-center gap-3 mb-2">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-indigo-200 font-semibold uppercase tracking-wide text-sm lg:text-base">Next Booking Opens</p>
             </div>
             <p className="text-xl lg:text-3xl font-bold text-white mt-1 lg:mt-2 text-center">
                {nextDate}
             </p>
          </div>
          
          {/* Info Note */}
          <div className="flex items-start gap-3 lg:gap-4 p-4 lg:p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl max-w-md w-full">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-300 text-left leading-relaxed">
              You have completed your submission for this week.
            </p>
          </div>
          
          <div className="mt-8 lg:mt-12">
            <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
                ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
