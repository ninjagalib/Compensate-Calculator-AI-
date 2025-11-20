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
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 md:p-10">
      
      {/* 1. Role & Location Section */}
      <div className="space-y-8 mb-10">
         <div className="flex items-center space-x-3 mb-6">
             <div className="h-px flex-grow bg-slate-100"></div>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Professional Profile</h3>
             <div className="h-px flex-grow bg-slate-100"></div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Current Job Title</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50/50"
                    placeholder="e.g. Senior Designer"
                    value={profile.currentRole}
                    onChange={(e) => handleChange('currentRole', e.target.value)}
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Industry</label>
                <select
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50/50"
                    value={profile.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                >
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Experience (Years)</label>
                <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50/50"
                    placeholder="e.g. 4.5"
                    value={profile.yearsExperience || ''}
                    onChange={(e) => handleChange('yearsExperience', parseFloat(e.target.value))}
                />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Current Location</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-slate-50/50"
                placeholder="e.g. Dhaka, Bangladesh"
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
         </div>
         
         {/* Currency */}
         <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-slate-700">Currency</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CURRENCIES.map(curr => (
                <button
                    key={curr.code}
                    type="button"
                    onClick={() => handleChange('currency', curr.code)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                    profile.currency === curr.code
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                    {curr.symbol} {curr.code}
                </button>
                ))}
            </div>
         </div>
      </div>

      {/* 2. Main Compensation Section */}
      <div className="mb-10">
         <div className="flex items-center space-x-3 mb-6">
             <div className="h-px flex-grow bg-slate-100"></div>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compensation Structure</h3>
             <div className="h-px flex-grow bg-slate-100"></div>
         </div>
        
        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Base Salary (Monthly)</label>
                <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">{profile.currency}</span>
                    <input
                        type="number"
                        min="0"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white"
                        placeholder="0"
                        value={profile.monthlyBaseSalary || ''}
                        onChange={(e) => handleChange('monthlyBaseSalary', parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Incentive (Monthly)</label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white pr-12"
                        placeholder="0"
                        value={profile.monthlyIncentive || ''}
                        onChange={(e) => handleChange('monthlyIncentive', parseFloat(e.target.value))}
                    />
                    <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">x12</span>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Overtime (Monthly)</label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white pr-12"
                        placeholder="0"
                        value={profile.monthlyOvertime || ''}
                        onChange={(e) => handleChange('monthlyOvertime', parseFloat(e.target.value))}
                    />
                    <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">x12</span>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Profit Share (Annual)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white"
                    placeholder="0"
                    value={profile.annualProfitShare || ''}
                    onChange={(e) => handleChange('annualProfitShare', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Festival Bonus (Annual)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white"
                    placeholder="0"
                    value={profile.festivalBonus || ''}
                    onChange={(e) => handleChange('festivalBonus', parseFloat(e.target.value))}
                />
            </div>
        </div>
      </div>

      {/* 3. Benefits & Funds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gratuity (Annual)</label>
            <input
                type="number"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-slate-50/50"
                placeholder="0"
                value={profile.gratuity || ''}
                onChange={(e) => handleChange('gratuity', parseFloat(e.target.value))}
            />
        </div>

        <div className="p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Provident Fund (Annual)</label>
            <input
                type="number"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-slate-50/50"
                placeholder="0"
                value={profile.providentFund || ''}
                onChange={(e) => handleChange('providentFund', parseFloat(e.target.value))}
            />
        </div>

        <div className="p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Company Benefits</label>
            <div className="space-y-3">
                {BENEFIT_OPTIONS.map(benefit => (
                    <label key={benefit} className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${profile.benefits.includes(benefit) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                             {profile.benefits.includes(benefit) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={profile.benefits.includes(benefit)}
                            onChange={() => toggleBenefit(benefit)}
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{benefit}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-5 rounded-2xl shadow-xl shadow-slate-300/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transform active:scale-[0.99]"
      >
        {isLoading ? (
            <span>Consulting Market Data...</span>
        ) : (
            <>
                <span>Analyze My Compensation</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </>
        )}
      </button>
    </form>
  );
};

export default SalaryForm;