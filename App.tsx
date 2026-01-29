import React, { useState } from 'react';
import { Header } from './components/Header';
import { AnalysisView } from './components/AnalysisView';
import { DocumentsView } from './components/DocumentsView';
import { ComplianceView } from './components/ComplianceView';
import { SettingsView } from './components/SettingsView';
import { LoginView } from './components/LoginView';
import { Page, LexiGuardResponse } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState<LexiGuardResponse | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AnalysisView onAnalysisComplete={setLatestAnalysis} />;
      case 'documents':
        return <DocumentsView />;
      case 'compliance':
        return <ComplianceView analysisData={latestAnalysis} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <AnalysisView onAnalysisComplete={setLatestAnalysis} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-slate-900">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;