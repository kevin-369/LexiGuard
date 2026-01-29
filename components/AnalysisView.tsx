import React, { useState, useRef } from 'react';
import { RiskMatrix } from './RiskMatrix';
import { GovernanceGauge } from './GovernanceGauge';
import { analyzeLegalDocument } from '../services/geminiService';
import { AnalysisState, LexiGuardResponse } from '../types';

interface Props {
  onAnalysisComplete?: (data: LexiGuardResponse) => void;
}

export const AnalysisView: React.FC<Props> = ({ onAnalysisComplete }) => {
  const [inputText, setInputText] = useState('');
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    status: 'idle',
    data: null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setAnalysisState({ status: 'analyzing', data: null });

    try {
      const result = await analyzeLegalDocument(inputText);
      setAnalysisState({ status: 'complete', data: result });
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (error) {
      setAnalysisState({ 
        status: 'error', 
        data: null, 
        error: error instanceof Error ? error.message : "An unexpected error occurred." 
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="animate-fade-in-up">
      {/* Intro Section */}
      <section className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Legal Intelligence Engine</h1>
        <p className="text-slate-500">
          Securely analyze contracts, NDAs, and filings for instant risk assessment and ESG compliance checking.
        </p>
      </section>

      {/* Input Area */}
      <div className="glass-panel rounded-xl shadow-sm p-6 mb-8 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Document Input</h2>
          <div className="space-x-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".txt,.md,.json,.csv" 
            />
            <button 
              onClick={triggerFileUpload}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Upload Text File
            </button>
            <button 
              onClick={handleAnalyze}
              disabled={!inputText.trim() || analysisState.status === 'analyzing'}
              className="px-6 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {analysisState.status === 'analyzing' ? 'Processing...' : 'Analyze Document'}
            </button>
          </div>
        </div>
        <textarea
          className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-y font-mono text-sm text-slate-700"
          placeholder="Paste your legal document text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
         <p className="text-xs text-gray-400 mt-2 text-right">
           Supported formats: Raw Text. All processing is secure.
         </p>
      </div>

      {/* Error State */}
      {analysisState.status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
          <p className="font-medium">Analysis Failed</p>
          <p className="text-sm">{analysisState.error}</p>
        </div>
      )}

      {/* Results Area */}
      {analysisState.status === 'complete' && analysisState.data && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Top Row: Executive Summary & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Summary Card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Executive Summary</h3>
                  <p className="text-xs text-slate-400 mt-1">Plain English Translation</p>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Tone: {analysisState.data.document_analysis.tone_check}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Complexity: {analysisState.data.document_analysis.complexity_score}/10
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {analysisState.data.document_analysis.summary.map((point, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {i + 1}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Gauge */}
            <div className="lg:col-span-1">
              <GovernanceGauge data={analysisState.data.governance_score} />
            </div>
          </div>

          {/* Risk Matrix */}
          <RiskMatrix data={analysisState.data.risk_matrix} />

          {/* Action Chips */}
          <div className="bg-slate-900 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Recommended Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisState.data.action_chips.map((chip, idx) => (
                <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-brand-gold transition-colors cursor-default">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {chip.label}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {chip.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 pb-4">
            <p className="text-xs text-gray-400">
              Disclaimer: LexiGuard is an AI-powered tool. This analysis does not constitute legal advice. 
              Please consult with qualified legal counsel for binding decisions.
            </p>
          </div>

        </div>
      )}
    </div>
  );
};