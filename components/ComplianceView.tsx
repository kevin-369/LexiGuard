import React, { useState, useMemo } from 'react';
import { LexiGuardResponse } from '../types';

interface Props {
  analysisData: LexiGuardResponse | null;
}

const DEFAULT_HEATMAP = [
  { label: "Data Privacy (GDPR/DPA)", value: 92, color: "bg-emerald-500" },
  { label: "Labor Standards", value: 88, color: "bg-emerald-500" },
  { label: "Environmental Impact", value: 74, color: "bg-yellow-400" },
  { label: "Anti-Money Laundering", value: 98, color: "bg-emerald-600" }
];

const DEFAULT_DEADLINES = [
  { month: "Oct", day: "28", title: "Quarterly ESG Filing", subtext: "Mandatory for EDGE certification renewal." },
  { month: "Nov", day: "05", title: "Data Protection Audit", subtext: "Internal review of customer data handling." },
  { month: "Nov", day: "12", title: "Board Governance Review", subtext: "Annual self-assessment distribution." }
];

const StatCard = ({ title, value, subtext, trend, trendUp, highlight = false }: any) => (
  <div className={`bg-white rounded-xl p-6 border ${highlight ? 'border-brand-gold shadow-md' : 'border-gray-200 shadow-sm'} print:border-gray-800 print:shadow-none h-full flex flex-col justify-between`}>
    <div>
      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide print:text-black">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900 print:text-black">{value}</span>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full print:border print:border-gray-400 ${trendUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
    <p className="mt-2 text-xs text-slate-400 print:text-gray-600">{subtext}</p>
  </div>
);

export const ComplianceView: React.FC<Props> = ({ analysisData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Compute stats based on real analysis data if available
  const stats = useMemo(() => {
    if (analysisData) {
      const riskCount = 
        analysisData.risk_matrix.high_priority.length + 
        analysisData.risk_matrix.medium_priority.length;
      
      return [
        { 
          title: "ESG Readiness", 
          value: `${analysisData.governance_score.rating}%`, 
          trend: "Live", 
          trendUp: analysisData.governance_score.rating > 70, 
          subtext: "Based on latest analysis",
          highlight: true
        },
        { 
          title: "Identified Risks", 
          value: riskCount.toString(), 
          trend: analysisData.risk_matrix.high_priority.length > 0 ? "Critical" : "Stable", 
          trendUp: analysisData.risk_matrix.high_priority.length === 0, 
          subtext: `${analysisData.risk_matrix.high_priority.length} high priority items`,
          highlight: true
        },
        { title: "Docs Reviewed", value: "1", trend: "Just Now", trendUp: true, subtext: "Session active" },
        { title: "Compliance Status", value: analysisData.governance_score.rating > 80 ? "Good" : "Review", trend: "-", trendUp: true, subtext: "Action required" }
      ];
    }
    
    // Default Demo Data
    return [
      { title: "ESG Readiness", value: "85%", trend: "+5%", trendUp: true, subtext: "Industry avg: 80%" },
      { title: "Active Risks", value: "12", trend: "-2", trendUp: true, subtext: "3 High priority" },
      { title: "Docs Reviewed", value: "1,240", trend: "+12%", trendUp: true, subtext: "This quarter" },
      { title: "Pending Audits", value: "2", trend: "Urgent", trendUp: false, subtext: "Due in 14 days" }
    ];
  }, [analysisData]);

  const handlePrint = () => {
    setIsMenuOpen(false);
    window.print();
  };

  const handleDownloadCSV = () => {
    setIsMenuOpen(false);
    
    let csvContent = "Category,Metric,Value,Notes\n";
    
    stats.forEach(item => {
      const subtext = item.subtext.replace(/"/g, '""');
      csvContent += `Statistics,${item.title},"${item.value}","${subtext}"\n`;
    });

    DEFAULT_HEATMAP.forEach(item => {
      csvContent += `Compliance Score,${item.label},${item.value}%,\n`;
    });

    // Use Blob for robust download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) { 
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "lexiguard_compliance_report.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  return (
    <div className="animate-fade-in-up pb-12" onClick={() => isMenuOpen && setIsMenuOpen(false)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">Regulatory Compliance Overview</h2>
            {!analysisData && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-500 uppercase">Demo Data</span>}
            {analysisData && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase animate-pulse">Live Analysis</span>}
          </div>
          <p className="text-slate-500 text-sm">Real-time tracking of ESG and legal conformity metrics.</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
            <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-full md:w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 py-1 animate-fade-in-up">
              <button 
                onClick={handlePrint}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Export as PDF
              </button>
              <button 
                onClick={handleDownloadCSV}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Export as CSV
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Print-only Header */}
      <div className="hidden print:block mb-8 border-b border-black pb-4">
         <h1 className="text-3xl font-bold text-black">LexiGuard Compliance Report</h1>
         <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 print:grid-cols-2">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:space-y-8">
        {/* Heatmap */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:border-gray-800 print:shadow-none print:break-inside-avoid">
          <h3 className="text-lg font-bold text-slate-900 mb-4 print:text-black">Compliance Heatmap</h3>
          <div className="space-y-4">
             {DEFAULT_HEATMAP.map((item, idx) => (
               <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600 print:text-gray-800">{item.label}</span>
                     <span className="text-slate-900 font-medium print:text-black">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 print:border print:border-gray-300">
                     <div className={`${item.color} h-2 rounded-full print:bg-black`} style={{ width: `${item.value}%` }}></div>
                  </div>
               </div>
             ))}
          </div>
          {analysisData && (
             <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">AI Governance Notes</h4>
                <p className="text-sm text-slate-600 italic">"{analysisData.governance_score.esg_notes}"</p>
             </div>
          )}
        </div>

        {/* Deadlines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:border-gray-800 print:shadow-none print:break-inside-avoid">
          <h3 className="text-lg font-bold text-slate-900 mb-4 print:text-black">Upcoming Regulatory Deadlines</h3>
           <ul className="space-y-4">
              {DEFAULT_DEADLINES.map((item, idx) => (
                <li key={idx} className={`flex gap-4 items-start ${idx > 0 ? 'pt-4 border-t border-gray-100 print:border-gray-300' : ''}`}>
                   <div className="flex-shrink-0 w-12 text-center">
                      <div className="text-xs text-slate-400 uppercase font-bold print:text-black">{item.month}</div>
                      <div className="text-xl font-bold text-slate-900 print:text-black">{item.day}</div>
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-800 print:text-black">{item.title}</h4>
                      <p className="text-xs text-slate-500 print:text-gray-600">{item.subtext}</p>
                   </div>
                   <button className="ml-auto text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded hover:bg-slate-200 print:hidden whitespace-nowrap">Action</button>
                </li>
              ))}
           </ul>
        </div>
      </div>
    </div>
  );
};