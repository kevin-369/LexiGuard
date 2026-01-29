import React from 'react';

export const SettingsView: React.FC = () => {
  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm">Manage your preferences and account configuration.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-medium text-slate-900">Profile & Organization</h3>
            <p className="text-sm text-slate-500">Update your company details for report generation.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" defaultValue="Alex Morgan" className="w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm p-2 border" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" defaultValue="LexiCorp International" className="w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm p-2 border" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                <input 
                  type="text" 
                  placeholder="e.g. Fintech, Manufacturing, Retail" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm p-2 border"
                />
             </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-medium text-slate-900">Analysis Preferences</h3>
            <p className="text-sm text-slate-500">Customize how the AI analyzes your documents.</p>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="esg" name="esg" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-500" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="esg" className="font-medium text-slate-700">Strict ESG Compliance Mode</label>
                  <p className="text-slate-500">Apply stricter international standards (EDGE, GRI) to analysis.</p>
                </div>
             </div>
             <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="plain_english" name="plain_english" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-500" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="plain_english" className="font-medium text-slate-700">Plain English Summaries</label>
                  <p className="text-slate-500">Ensure all outputs are readable by non-legal executives (Flesch-Kincaid Grade 8).</p>
                </div>
             </div>
             <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="notifications" name="notifications" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-500" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notifications" className="font-medium text-slate-700">Email Notifications</label>
                  <p className="text-slate-500">Receive weekly summaries of analyzed document risks.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
           <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
             Save Changes
           </button>
        </div>
      </div>
    </div>
  );
};