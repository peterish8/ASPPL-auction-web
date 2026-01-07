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
        <div className="flex flex-col items-center pt-10 lg:justify-center lg:min-h-[600px] text-center px-6">
          {/* Success Icon */}
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-green-500/20 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-900/40 animate-pulse">
            <svg className="w-12 h-12 lg:w-16 lg:h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Success Message */}
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Submission Successful!
          </h2>
          <p className="text-lg lg:text-xl text-slate-400 mb-8 max-w-md">
            Your trade booking request has been submitted successfully.
          </p>
          
          {/* Reference Info */}
          <div className="bg-slate-800/50 rounded-xl p-8 mb-8 border border-slate-700/50 w-full max-w-md">
            <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wider">Reference Number</p>
            <p className="text-3xl font-mono font-bold text-emerald-400 tracking-wider">
              TB-{submissionId}
            </p>
          </div>

          {/* Next Opening Date Feature */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 rounded-xl p-8 mb-8 border border-indigo-500/30 w-full max-w-md backdrop-blur-md">
             <div className="flex items-center justify-center gap-3 mb-2">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-indigo-200 font-semibold uppercase tracking-wide">Next Booking Opens</p>
             </div>
             <p className="text-2xl lg:text-3xl font-bold text-white mt-2">
                {nextDate}
             </p>
          </div>
          
          {/* Info Note */}
          <div className="flex items-start gap-4 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl max-w-md">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-300 text-left leading-relaxed">
              You have completed your submission for this week.
            </p>
          </div>
          
          <div className="mt-8">
            <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
                ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
