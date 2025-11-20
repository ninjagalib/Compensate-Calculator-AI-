import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-slate-800">Analyzing Market Data...</h3>
        <p className="text-slate-500">Consulting millions of data points to find your true value.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
