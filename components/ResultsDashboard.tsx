import React from 'react';
import { CompensationInsights, UserProfile } from '../types';
import SalaryChart from './SalaryChart';

interface ResultsDashboardProps {
  results: CompensationInsights;
  userProfile: UserProfile;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, userProfile, onReset }) => {
  
  // Calculate Total Annual Compensation
  const totalComp = (
    (userProfile.baseSalary || 0) +
    ((userProfile.monthlyIncentive || 0) * 12) +
    ((userProfile.monthlyProfitShare || 0) * 12) +
    (userProfile.annualOvertime || 0) +
    (userProfile.festivalBonus || 0) +
    (userProfile.providentFund || 0) +
    (userProfile.gratuity || 0)
  );

  const monthlyComp = totalComp / 12;

  // Expected Monthly Calculation (Estimates)
  const expMinMonthly = results.nextCareerMove.salaryRange.min / 12;
  const expMaxMonthly = results.nextCareerMove.salaryRange.max / 12;

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
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Verdict */}
        <div className={`p-6 rounded-2xl border-l-4 shadow-sm bg-white ${
            results.marketAnalysis.paymentStatus === 'Underpaid' ? 'border-red-500' : 
            results.marketAnalysis.paymentStatus === 'Fair' ? 'border-yellow-500' : 'border-green-500'
        }`}>
            <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Verdict</p>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">in {userProfile.location}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{results.marketAnalysis.paymentStatus}</h2>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{results.marketAnalysis.gapAnalysis}</p>
        </div>

        {/* Market Position */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
             <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Market Position</p>
             <h2 className="text-2xl font-bold text-slate-800 mt-1">{results.marketAnalysis.percentile}th Percentile</h2>
             <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${results.marketAnalysis.percentile}%` }}></div>
             </div>
             <p className="text-xs text-slate-400 mt-2 text-right">Top {100 - results.marketAnalysis.percentile}% of earners</p>
        </div>

        {/* Predicted Role */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg text-white">
            <p className="text-xs font-medium uppercase text-purple-200 tracking-wider mb-1">Next Expected Role</p>
            <h2 className="text-xl font-bold mb-2">{results.nextCareerMove.roleTitle}</h2>
            <div className="flex items-center text-xs text-purple-100 bg-white/10 rounded-lg p-2 w-fit">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {results.nextCareerMove.timeframeYears}
            </div>
        </div>
      </div>

      {/* 2. Current vs Expected Breakdown (Table) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Compensation Comparison</h3>
            <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">Based on {userProfile.location}</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-100">
                        <th className="px-6 py-3 font-semibold uppercase tracking-wider bg-slate-50/50 w-1/3">Period</th>
                        <th className="px-6 py-3 font-semibold uppercase tracking-wider bg-blue-50/30 text-blue-900 w-1/3">
                            Current: {userProfile.currentRole}
                        </th>
                        <th className="px-6 py-3 font-semibold uppercase tracking-wider bg-green-50/30 text-green-900 w-1/3">
                            Expected: {results.nextCareerMove.roleTitle}
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-600">
                            Monthly (Avg)
                            <p className="text-[10px] text-slate-400 font-normal mt-0.5">Includes all benefits prorated</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 text-lg">
                            {currencySymbol}{formatMoney(monthlyComp)}
                        </td>
                        <td className="px-6 py-4 font-bold text-green-700 text-lg">
                            {currencySymbol}{formatMoney(expMinMonthly)} - {formatMoney(expMaxMonthly)}
                        </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-600">
                            Annual (Total)
                            <p className="text-[10px] text-slate-400 font-normal mt-0.5">Full package value</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 text-lg">
                            {currencySymbol}{formatMoney(totalComp)}
                        </td>
                        <td className="px-6 py-4 font-bold text-green-700 text-lg">
                            {currencySymbol}{formatMoney(results.nextCareerMove.salaryRange.min)} - {formatMoney(results.nextCareerMove.salaryRange.max)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>

      {/* 3. Chart & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Chart */}
        <div className="lg:col-span-2">
            <SalaryChart 
                currentTotal={totalComp} 
                marketAnalysis={results.marketAnalysis}
                nextRole={results.nextCareerMove}
                currency={userProfile.currency}
            />
            
            <div className="mt-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h4 className="text-sm font-bold text-slate-800 mb-3">Skills required for next level</h4>
                <div className="flex flex-wrap gap-2">
                    {results.nextCareerMove.requiredSkills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Right: Strategy & Tips */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Action Plan</h3>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="space-y-4">
                        {results.negotiationTips.map((tip, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                    {index + 1}
                                </span>
                                <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <button 
                        onClick={onReset}
                        className="w-full py-3 rounded-lg border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        Analyze Another Profile
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ResultsDashboard;