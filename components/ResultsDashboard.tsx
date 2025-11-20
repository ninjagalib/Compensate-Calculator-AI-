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
    <div className="space-y-12 animate-fade-in">
      
      {/* 1. Header & Verdict */}
      <div className="text-center space-y-4 border-b border-slate-100 pb-8">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
              results.marketAnalysis.paymentStatus === 'Underpaid' ? 'bg-red-50 text-red-700 border-red-200' : 
              results.marketAnalysis.paymentStatus === 'Fair' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
              'bg-green-50 text-green-700 border-green-200'
          }`}>
            {results.marketAnalysis.paymentStatus} for {userProfile.currentRole}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
             You are in the Top {100 - results.marketAnalysis.percentile}%
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {results.marketAnalysis.gapAnalysis}
          </p>
      </div>

      {/* 2. Financial Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Monthly Pay</p>
              <p className="text-xs text-slate-500 mb-4 font-light">All-in income (Salary + Bonuses + Benefits)</p>
              <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight">{currencySymbol}{formatMoney(effectiveMonthly)}</span>
                  <span className="ml-2 text-slate-400 font-light">/mo</span>
              </div>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Total Annual Package</p>
              <p className="text-xs text-slate-400 mb-4 font-light">Full calculated yearly value</p>
              <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{currencySymbol}{formatMoney(totalComp)}</span>
                  <span className="ml-2 text-slate-400 font-light">/yr</span>
              </div>
          </div>
      </div>

      {/* 3. Career Trajectory Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-bold text-slate-800">Compensation Projection</h3>
                   <div className="text-right">
                       <p className="text-xs text-slate-400 uppercase tracking-wider">Next Role</p>
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
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-2">Skill Gaps</h3>
                  <p className="text-blue-100 text-sm mb-4">Master these to reach the next level:</p>
                  <div className="flex flex-wrap gap-2">
                      {results.nextCareerMove.requiredSkills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium">
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>
              
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Timeline</h3>
                  <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                          <p className="text-sm text-slate-500">Expected promotion in</p>
                          <p className="text-lg font-bold text-slate-900">{results.nextCareerMove.timeframeYears}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. Negotiation Strategy (New Section) */}
      <div className="border-t border-slate-200 pt-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Negotiation Strategy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Pitch Script */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800">"Why You Are Perfect"</h4>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-700 italic leading-relaxed border-l-4 border-indigo-500">
                      "{results.negotiation.whyYouArePerfect}"
                  </div>
              </div>

              {/* Justification Script */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800">"Why You Deserve It"</h4>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-700 italic leading-relaxed border-l-4 border-blue-500">
                      "{results.negotiation.whyYouDeserveIt}"
                  </div>
              </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
              <h4 className="text-center text-indigo-900 font-bold uppercase tracking-widest text-sm mb-6">Quick Actionable Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.negotiation.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-white text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shadow-sm mt-0.5">
                              {idx + 1}
                          </span>
                          <p className="text-indigo-800 text-sm leading-relaxed font-medium">{tip}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="pt-8 flex justify-center">
          <button 
              onClick={onReset}
              className="px-8 py-3 bg-white text-slate-600 font-semibold rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
          >
              Analyze Another Profile
          </button>
      </div>

    </div>
  );
};

export default ResultsDashboard;