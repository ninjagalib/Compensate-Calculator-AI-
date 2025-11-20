import React from 'react';
import { CompensationInsights, UserProfile } from '../types';
import SalaryChart from './SalaryChart';

interface ResultsDashboardProps {
  results: CompensationInsights;
  userProfile: UserProfile;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, userProfile, onReset }) => {
  
  // Calculate Total Annual Compensation based on updated fields
  const totalComp = (
    ((userProfile.monthlyBaseSalary || 0) * 12) +
    ((userProfile.monthlyIncentive || 0) * 12) +
    ((userProfile.monthlyOvertime || 0) * 12) +
    (userProfile.annualProfitShare || 0) +
    (userProfile.festivalBonus || 0) +
    (userProfile.providentFund || 0) +
    (userProfile.gratuity || 0)
  );

  // Exact Monthly Calculation based on total package
  const effectiveMonthly = totalComp / 12;

  const currencySymbol = userProfile.currency === 'USD' ? '$' : 
                         userProfile.currency === 'EUR' ? '€' : 
                         userProfile.currency === 'GBP' ? '£' : 
                         userProfile.currency === 'BDT' ? '৳' : 
                         userProfile.currency === 'INR' ? '₹' : '$';

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-4xl mx-auto">
      
      {/* 1. Header & Verdict */}
      <div className="text-center space-y-8 pb-4">
          <div className="inline-block">
            <span className={`inline-flex items-center px-6 py-2 rounded-full text-base font-extrabold border shadow-sm ${
                results.marketAnalysis.paymentStatus === 'Underpaid' ? 'bg-red-50 text-red-600 border-red-100' : 
                results.marketAnalysis.paymentStatus === 'Fair' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                'bg-emerald-50 text-emerald-600 border-emerald-100'
            }`}>
                {results.marketAnalysis.paymentStatus === 'Highly Competitive' && '🚀 '}
                {results.marketAnalysis.paymentStatus}
            </span>
          </div>
          
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">{100 - results.marketAnalysis.percentile}%</span> of Earners
            </h2>
          </div>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm">
              {results.marketAnalysis.gapAnalysis}
          </p>
      </div>

      {/* 2. Financial Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Card - Colorful Gradient */}
          <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-[2rem] shadow-xl shadow-indigo-200 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2 opacity-90">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-sm font-bold uppercase tracking-widest">Effective Monthly</p>
                </div>
                <p className="text-indigo-100 text-sm mb-6">Includes bonuses & benefits divided by 12</p>
                <div className="flex items-baseline">
                    <span className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-sm">{currencySymbol}{formatMoney(effectiveMonthly)}</span>
                    <span className="ml-2 text-indigo-200 font-semibold text-lg">/mo</span>
                </div>
              </div>
          </div>

          {/* Secondary Card - Clean White */}
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-lg shadow-slate-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
              <div className="flex items-center space-x-2 mb-2 text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 36v-3m-6 6h6m-6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs font-bold uppercase tracking-widest">Total Annual Package</p>
              </div>
              <p className="text-slate-400 text-sm mb-6">Base + Bonuses + Funds</p>
              <div className="flex items-baseline text-slate-900">
                  <span className="text-5xl md:text-6xl font-black tracking-tight">{currencySymbol}{formatMoney(totalComp)}</span>
                  <span className="ml-2 text-slate-400 font-semibold text-lg">/yr</span>
              </div>
          </div>
      </div>

      {/* 3. Career Trajectory Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-100/50">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                   <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                       </div>
                       <h3 className="text-xl font-bold text-slate-900">Next Career Move</h3>
                   </div>
                   <div className="text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                       <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Target Role</p>
                       <p className="font-bold text-indigo-600 text-lg">{results.nextCareerMove.roleTitle}</p>
                   </div>
               </div>
               <SalaryChart 
                  currentTotal={totalComp} 
                  marketAnalysis={results.marketAnalysis}
                  nextRole={results.nextCareerMove}
                  currency={userProfile.currency}
              />
          </div>
          
          <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      <h3 className="text-lg font-bold">Skill Gap</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                      {results.nextCareerMove.requiredSkills.map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold tracking-wide border border-white/10">
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>
              
              <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Estimated Timeline</h3>
                  <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                          <p className="text-sm text-slate-500 font-medium">Achievable in</p>
                          <p className="text-2xl font-black text-slate-900">{results.nextCareerMove.timeframeYears}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. Negotiation Strategy */}
      <div className="pt-8">
          <div className="flex items-center space-x-4 mb-10 justify-center">
            <div className="h-px w-12 bg-slate-200"></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Negotiation Strategy</h3>
            <div className="h-px w-12 bg-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Why Perfect */}
              <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-lg shadow-emerald-100/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-[2rem] -mr-4 -mt-4 z-0"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">Your Value Proposition</h4>
                    </div>
                    <div className="text-slate-600 italic leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                        "{results.negotiation.whyYouArePerfect}"
                    </div>
                  </div>
              </div>

              {/* Why Asking This */}
              <div className="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-lg shadow-blue-100/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-[2rem] -mr-4 -mt-4 z-0"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">Market Justification</h4>
                    </div>
                    <div className="text-slate-600 italic leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        "{results.negotiation.whyYouDeserveIt}"
                    </div>
                  </div>
              </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-8 md:p-10 text-white shadow-xl">
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md">💡</span>
                  Tactical Tips for HR
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.negotiation.tips.map((tip, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                          <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2 block">Tip 0{idx + 1}</span>
                          <p className="text-slate-100 text-sm font-medium leading-relaxed">{tip}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="pt-12 flex justify-center pb-12">
          <button 
              onClick={onReset}
              className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all transform active:scale-95 flex items-center gap-2"
          >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Analyze Another Profile
          </button>
      </div>

    </div>
  );
};

export default ResultsDashboard;