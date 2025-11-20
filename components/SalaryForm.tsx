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
    <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-12">
      
      {/* 1. Role & Location Section */}
      <div className="space-y-8 mb-12">
         <div className="flex items-center justify-between">
             <h3 className="text-lg font-bold text-slate-900">Your Profile</h3>
             <div className="h-px flex-grow bg-slate-100 ml-6"></div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Job Title</label>
                <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-slate-900 focus:ring-0 transition-all outline-none bg-slate-50 font-medium"
                    placeholder="e.g. Product Designer"
                    value={profile.currentRole}
                    onChange={(e) => handleChange('currentRole', e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Industry</label>
                <select
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-slate-900 focus:ring-0 transition-all outline-none bg-slate-50 font-medium appearance-none"
                    value={profile.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                >
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Experience (Years)</label>
                <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-slate-900 focus:ring-0 transition-all outline-none bg-slate-50 font-medium"
                    placeholder="e.g. 3"
                    value={profile.yearsExperience || ''}
                    onChange={(e) => handleChange('yearsExperience', parseFloat(e.target.value))}
                />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">City & Country</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-slate-900 focus:ring-0 transition-all outline-none bg-slate-50 font-medium"
                placeholder="e.g. London, UK"
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
         </div>
         
         {/* Currency */}
         <div className="space-y-3 pt-2">
            <label className="text-sm font-semibold text-slate-700">Currency</label>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {CURRENCIES.map(curr => (
                <button
                    key={curr.code}
                    type="button"
                    onClick={() => handleChange('currency', curr.code)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border-2 ${
                    profile.currency === curr.code
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                    }`}
                >
                    {curr.symbol} {curr.code}
                </button>
                ))}
            </div>
         </div>
      </div>

      {/* 2. Main Compensation Section */}
      <div className="mb-12">
         <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold text-slate-900">Income Details</h3>
             <div className="h-px flex-grow bg-slate-100 ml-6"></div>
         </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Monthly Base Salary</label>
                <div className="relative">
                    <span className="absolute left-5 top-4 text-slate-900 font-bold">{profile.currency}</span>
                    <input
                        type="number"
                        min="0"
                        className="w-full pl-16 pr-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-bold text-lg text-slate-900"
                        placeholder="0"
                        value={profile.monthlyBaseSalary || ''}
                        onChange={(e) => handleChange('monthlyBaseSalary', parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Monthly Incentive</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.monthlyIncentive || ''}
                    onChange={(e) => handleChange('monthlyIncentive', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Monthly Overtime</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.monthlyOvertime || ''}
                    onChange={(e) => handleChange('monthlyOvertime', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Yearly Profit Share</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.annualProfitShare || ''}
                    onChange={(e) => handleChange('annualProfitShare', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Festival Bonus (Yearly)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-medium"
                    placeholder="0"
                    value={profile.festivalBonus || ''}
                    onChange={(e) => handleChange('festivalBonus', parseFloat(e.target.value))}
                />
            </div>
        </div>
      </div>

      {/* 3. Benefits & Funds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Gratuity (Yearly)</label>
            <input
                type="number"
                min="0"
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-medium"
                placeholder="0"
                value={profile.gratuity || ''}
                onChange={(e) => handleChange('gratuity', parseFloat(e.target.value))}
            />
        </div>

        <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Provident Fund (Yearly)</label>
            <input
                type="number"
                min="0"
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none bg-white font-medium"
                placeholder="0"
                value={profile.providentFund || ''}
                onChange={(e) => handleChange('providentFund', parseFloat(e.target.value))}
            />
        </div>

        <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Additional Perks</label>
            <div className="space-y-3">
                {BENEFIT_OPTIONS.map(benefit => (
                    <label key={benefit} className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${profile.benefits.includes(benefit) ? 'bg-slate-900 border-slate-900' : 'border-slate-200 bg-white'}`}>
                             {profile.benefits.includes(benefit) && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden"
                            checked={profile.benefits.includes(benefit)}
                            onChange={() => toggleBenefit(benefit)}
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{benefit}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-6 rounded-2xl shadow-xl shadow-slate-200 transition-all disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center space-x-3 active:scale-[0.99]"
      >
        {isLoading ? (
            <span>Analyzing Profile...</span>
        ) : (
            <>
                <span>Check My Worth</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
        )}
      </button>
    </form>
  );
};

export default SalaryForm;