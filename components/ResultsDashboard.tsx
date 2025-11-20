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
      <div className="text-center space-y-6 pb-8">
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${
              results.marketAnalysis.paymentStatus === 'Underpaid' ? 'bg-red-50 text-red-600 border-red-100' : 
              results.marketAnalysis.paymentStatus === 'Fair' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 
              'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>
            {results.marketAnalysis.paymentStatus}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
             Top {100 - results.marketAnalysis.percentile}% of Earners
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
              {results.marketAnalysis.gapAnalysis}
          </p>
      </div>

      {/* 2. Financial Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Effective Monthly Salary</p>
              <p className="text-xs text-slate-500 mb-4">Includes base, bonuses & benefits</p>
              <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight">{currencySymbol}{formatMoney(effectiveMonthly)}</span>
                  <span className="ml-2 text-slate-400 font-medium">/mo</span>
              </div>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Annual Package</p>
              <p className="text-xs text-slate-400 mb-4">Full yearly value</p>
              <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{currencySymbol}{formatMoney(totalComp)}</span>
                  <span className="ml-2 text-slate-400 font-medium">/yr</span>
              </div>
          </div>
      </div>

      {/* 3. Career Trajectory Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                   <h3 className="text-lg font-bold text-slate-900">Next Career Move</h3>
                   <div className="text-right">
                       <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Target Role</p>
                       <p className="font-semibold text-blue-600">{results.nextCareerMove.roleTitle}</p>
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
              <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
                  <h3 className="text-lg font-bold mb-2">Key Skills Needed</h3>
                  <p className="text-blue-100 text-sm mb-4">Master these to level up:</p>
                  <div className="flex flex-wrap gap-2">
                      {results.nextCareerMove.requiredSkills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>
              
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Timeframe</h3>
                  <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                          <p className="text-sm text-slate-500">Achievable in</p>
                          <p className="text-lg font-bold text-slate-900">{results.nextCareerMove.timeframeYears}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. Negotiation Strategy (New Section) */}
      <div className="pt-8">
          <div className="flex items-center space-x-4 mb-8 justify-center">
            <div className="h-px w-12 bg-slate-200"></div>
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Negotiation Strategy</h3>
            <div className="h-px w-12 bg-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Why Perfect */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Why You Are Perfect</h4>
                  </div>
                  <div className="text-slate-600 italic leading-relaxed">
                      "{results.negotiation.whyYouArePerfect}"
                  </div>
              </div>

              {/* Why Asking This */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Why You Are Asking This</h4>
                  </div>
                  <div className="text-slate-600 italic leading-relaxed">
                      "{results.negotiation.whyYouDeserveIt}"
                  </div>
              </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h4 className="text-slate-900 font-bold mb-6">Pro Negotiation Tips</h4>
              <div className="space-y-4">
                  {results.negotiation.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-slate-100">
                          <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {idx + 1}
                          </span>
                          <p className="text-slate-700 text-sm font-medium">{tip}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="pt-12 flex justify-center pb-12">
          <button 
              onClick={onReset}
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all transform active:scale-95"
          >
              Analyze Another Profile
          </button>
      </div>

    </div>
  );
};

export default ResultsDashboard;