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
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleReset}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Compnsate<span className="text-blue-600">AI</span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        
        {!results && !isLoading && (
           <div className="max-w-2xl mx-auto mb-16 text-center animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">True Worth</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
                Stop guessing. Use advanced AI to analyze your total compensation, benchmark against the market, and get the script to negotiate your next raise.
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
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center space-y-2">
            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} CareerCompnsate AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;