import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  const handleGenerateToken = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const datePart = new Date().getDate().toString().padStart(2, '0');
      setAccessToken(`LEXI-24H-${datePart}-${randomPart}`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
              <span className="text-brand-gold font-serif font-bold text-2xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">LexiGuard</h1>
            <p className="text-slate-400 text-sm mt-2">Legal Intelligence Portal</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold text-slate-800">Secure Access</h2>
            <p className="text-sm text-slate-500 mt-1">
              Log in to the executive dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Access Token
                </label>
                <button 
                  onClick={handleGenerateToken}
                  disabled={isGenerating || accessToken.length > 0}
                  className="text-xs text-brand-gold hover:text-amber-600 font-medium disabled:opacity-50 disabled:cursor-default"
                >
                  {isGenerating ? 'Generating...' : 'Generate 24h Guest Pass'}
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Enter secure token" 
                  className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-mono ${accessToken ? 'bg-yellow-50 border-yellow-200 text-yellow-900' : ''}`}
                />
                {accessToken && (
                  <div className="absolute right-3 top-2.5 text-green-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading || !accessToken}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Start Session'
              )}
            </button>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>256-bit Secure Connection</span>
            </div>
            <p className="text-center text-[10px] text-slate-300 mt-2">
              Unauthorized access is prohibited. All sessions are monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};