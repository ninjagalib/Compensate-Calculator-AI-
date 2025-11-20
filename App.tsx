import React, { useState } from 'react';
import SalaryForm from './components/SalaryForm';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingScreen from './components/LoadingScreen';
import { UserProfile, CompensationInsights } from './types';
import { analyzeCompensation } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CompensationInsights | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setUserProfile(profile);
    
    try {
      const data = await analyzeCompensation(profile);
      if (data) {
        setResults(data);
      } else {
        setError("Could not generate analysis. Please check your API Key or try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setUserProfile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-100 flex flex-col">
      {/* Minimal Navigation */}
      <nav className="bg-white sticky top-0 z-50 py-6">
        <div className="max-w-5xl mx-auto px-6 flex justify-center">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleReset}>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                C
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900">Compnsate<span className="text-slate-400">AI</span></span>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-grow w-full">
        
        {!results && !isLoading && (
           <div className="max-w-2xl mx-auto mb-12 text-center animate-fade-in">
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Know Your Worth.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg mx-auto font-medium">
                Real compensation intelligence. Precise salary benchmarking.
              </p>
           </div>
        )}

        <div className="transition-all duration-500 ease-in-out">
          {isLoading ? (
            <LoadingScreen />
          ) : results && userProfile ? (
            <ResultsDashboard 
                results={results} 
                userProfile={userProfile} 
                onReset={handleReset}
            />
          ) : (
            <div className="max-w-3xl mx-auto">
               {error && (
                 <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                    {error}
                 </div>
               )}
               <SalaryForm onSubmit={handleAnalysis} isLoading={isLoading} />
            </div>
          )}
        </div>

      </main>
      
      {/* Minimal Footer */}
      <footer className="py-8 mt-auto text-center">
        <p className="text-slate-300 text-sm font-medium">&copy; {new Date().getFullYear()} CareerCompnsate AI</p>
      </footer>
    </div>
  );
};

export default App;