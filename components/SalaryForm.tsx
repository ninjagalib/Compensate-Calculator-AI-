import React, { useState } from 'react';
import { CURRENCIES, INDUSTRIES, DEFAULT_PROFILE, BENEFIT_OPTIONS } from '../constants';
import { UserProfile } from '../types';

interface SalaryFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleBenefit = (benefit: string) => {
    setProfile(prev => {
      const exists = prev.benefits.includes(benefit);
      if (exists) {
        return { ...prev, benefits: prev.benefits.filter(b => b !== benefit) };
      }
      return { ...prev, benefits: [...prev.benefits, benefit] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white p-8 md:p-12 relative overflow-hidden">
      
      {/* Decorative top glow */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* 1. Role & Location Section */}
      <div className="space-y-8 mb-12">
         <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                Your Profile
             </h3>
             <div className="h-px flex-grow bg-slate-100 ml-6"></div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Job Title</label>
                <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium"
                    placeholder="e.g. Senior Product Designer"
                    value={profile.currentRole}
                    onChange={(e) => handleChange('currentRole', e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Industry</label>
                <div className="relative">
                    <select
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium appearance-none"
                        value={profile.industry}
                        onChange={(e) => handleChange('industry', e.target.value)}
                    >
                        {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Experience (Years)</label>
                <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium"
                    placeholder="e.g. 5"
                    value={profile.yearsExperience || ''}
                    onChange={(e) => handleChange('yearsExperience', parseFloat(e.target.value))}
                />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City & Country</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium"
                placeholder="e.g. New York, USA"
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
         </div>
         
         {/* Currency */}
         <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Select Currency</label>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {CURRENCIES.map(curr => (
                <button
                    key={curr.code}
                    type="button"
                    onClick={() => handleChange('currency', curr.code)}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                    profile.currency === curr.code
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                >
                    {curr.symbol} {curr.code}
                </button>
                ))}
            </div>
         </div>
      </div>

      {/* 2. Main Compensation Section */}
      <div className="mb-12 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
         <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                Income Details
             </h3>
             <div className="h-px flex-grow bg-slate-200 ml-6"></div>
         </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Monthly Base Salary</label>
                <div className="relative">
                    <span className="absolute left-5 top-4 text-indigo-400 font-bold">{profile.currency}</span>
                    <input
                        type="number"
                        min="0"
                        className="w-full pl-16 pr-5 py-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white font-bold text-xl text-slate-900 shadow-sm"
                        placeholder="0"
                        value={profile.monthlyBaseSalary || ''}
                        onChange={(e) => handleChange('monthlyBaseSalary', parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Incentive</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.monthlyIncentive || ''}
                    onChange={(e) => handleChange('monthlyIncentive', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Overtime</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.monthlyOvertime || ''}
                    onChange={(e) => handleChange('monthlyOvertime', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Yearly Profit Share</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.annualProfitShare || ''}
                    onChange={(e) => handleChange('annualProfitShare', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Festival Bonus (Yearly)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.festivalBonus || ''}
                    onChange={(e) => handleChange('festivalBonus', parseFloat(e.target.value))}
                />
            </div>
        </div>
      </div>

      {/* 3. Benefits & Funds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gratuity (Yearly)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white/50 font-medium"
                    placeholder="0"
                    value={profile.gratuity || ''}
                    onChange={(e) => handleChange('gratuity', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Provident Fund (Yearly)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none bg-white/50 font-medium"
                    placeholder="0"
                    value={profile.providentFund || ''}
                    onChange={(e) => handleChange('providentFund', parseFloat(e.target.value))}
                />
            </div>
        </div>

        <div className="md:col-span-2 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
            <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-4">Additional Perks</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFIT_OPTIONS.map(benefit => (
                    <label key={benefit} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-xl border transition-all ${
                        profile.benefits.includes(benefit) 
                        ? 'bg-white border-indigo-200 shadow-sm' 
                        : 'bg-transparent border-transparent hover:bg-white/50'
                    }`}>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${profile.benefits.includes(benefit) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                             {profile.benefits.includes(benefit) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={profile.benefits.includes(benefit)}
                            onChange={() => toggleBenefit(benefit)}
                        />
                        <span className={`text-sm font-semibold ${profile.benefits.includes(benefit) ? 'text-indigo-900' : 'text-slate-600'}`}>{benefit}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:shadow-lg hover:shadow-indigo-500/30 text-white font-bold text-xl py-6 rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-3 active:scale-[0.98]"
      >
        {isLoading ? (
            <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Market Data...
            </span>
        ) : (
            <>
                <span>Analyze My Worth</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </>
        )}
      </button>
    </form>
  );
};

export default SalaryForm;