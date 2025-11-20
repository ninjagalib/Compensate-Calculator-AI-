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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Compnsate<span className="text-blue-600">AI</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">How it works</a>
                <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Data Sources</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        
        {!results && !isLoading && (
           <div className="max-w-2xl mx-auto mb-12 text-center">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">True Worth</span>
              </h1>
              <p className="text-lg text-slate-600">
                Stop guessing. Use AI to analyze your compensation package, verify market rates, and plan your next big career jump.
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
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
               {error && (
                 <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                    {error}
                 </div>
               )}
               <SalaryForm onSubmit={handleAnalysis} isLoading={isLoading} />
            </div>
          )}
        </div>

      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center space-y-2">
            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} CareerCompnsate AI. Market data estimated by Gemini 2.5.</p>
            <div className="flex items-center space-x-1 text-xs font-medium text-slate-300">
                <span>Developed by</span>
                <span className="text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">@galibgfx</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;