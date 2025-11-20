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
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* 1. Role & Location Section */}
      <div className="space-y-6">
         <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">Professional Profile</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Job Title</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    placeholder="e.g. Senior Designer"
                    value={profile.currentRole}
                    onChange={(e) => handleChange('currentRole', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                <select
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    value={profile.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                >
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
                <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    placeholder="e.g. 4.5"
                    value={profile.yearsExperience || ''}
                    onChange={(e) => handleChange('yearsExperience', parseFloat(e.target.value))}
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                placeholder="e.g. Dhaka, Bangladesh"
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
         </div>
         
         {/* Currency */}
         <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CURRENCIES.map(curr => (
                <button
                    key={curr.code}
                    type="button"
                    onClick={() => handleChange('currency', curr.code)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    profile.currency === curr.code
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                >
                    {curr.symbol} {curr.code}
                </button>
                ))}
            </div>
         </div>
      </div>

      {/* 2. Main Compensation Section */}
      <div className="bg-blue-50/30 p-6 rounded-xl border border-blue-100">
        <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 border-b border-blue-200 pb-2">Compensation Annually</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-blue-800 mb-1">Base Salary (Annual)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2.5 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                    placeholder="0"
                    value={profile.baseSalary || ''}
                    onChange={(e) => handleChange('baseSalary', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Incentive (Monthly)</label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white pr-12"
                        placeholder="0"
                        value={profile.monthlyIncentive || ''}
                        onChange={(e) => handleChange('monthlyIncentive', parseFloat(e.target.value))}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-blue-400 font-medium">x12</span>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Profit Share (Monthly)</label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2.5 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white pr-12"
                        placeholder="0"
                        value={profile.monthlyProfitShare || ''}
                        onChange={(e) => handleChange('monthlyProfitShare', parseFloat(e.target.value))}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-blue-400 font-medium">x12</span>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Overtime Payment (Annual)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2.5 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                    placeholder="0"
                    value={profile.annualOvertime || ''}
                    onChange={(e) => handleChange('annualOvertime', parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Festival Bonus (Annual)</label>
                <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2.5 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                    placeholder="0"
                    value={profile.festivalBonus || ''}
                    onChange={(e) => handleChange('festivalBonus', parseFloat(e.target.value))}
                />
            </div>
        </div>
      </div>

      {/* 3. Benefits & Funds in Separate Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Gratuity */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Gratuity</h4>
            <label className="block text-xs text-slate-500 mb-1">Annual Accrual</label>
            <input
                type="number"
                min="0"
                className="w-full px-3 py-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                placeholder="0"
                value={profile.gratuity || ''}
                onChange={(e) => handleChange('gratuity', parseFloat(e.target.value))}
            />
        </div>

        {/* Box 2: Provident Fund */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Provident Fund</h4>
            <label className="block text-xs text-slate-500 mb-1">Annual Contribution</label>
            <input
                type="number"
                min="0"
                className="w-full px-3 py-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                placeholder="0"
                value={profile.providentFund || ''}
                onChange={(e) => handleChange('providentFund', parseFloat(e.target.value))}
            />
        </div>

        {/* Box 3: Company Benefits */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Company Benefits</h4>
            <div className="space-y-2">
                {BENEFIT_OPTIONS.map(benefit => (
                    <label key={benefit} className="flex items-start space-x-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                            checked={profile.benefits.includes(benefit)}
                            onChange={() => toggleBenefit(benefit)}
                        />
                        <span className="text-xs text-slate-600 leading-tight">{benefit}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform active:scale-[0.99]"
      >
        {isLoading ? (
            <span>Analyzing Market Data...</span>
        ) : (
            <>
                <span>See Next Role & Salary Prediction</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </>
        )}
      </button>
    </form>
  );
};

export default SalaryForm;