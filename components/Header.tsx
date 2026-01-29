import React from 'react';
import { Page } from '../types';

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Header: React.FC<Props> = ({ currentPage, onNavigate }) => {
  const navItems: { id: Page; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'documents', label: 'Documents' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="w-8 h-8 bg-slate-900 rounded-sm flex items-center justify-center">
            <span className="text-brand-gold font-serif font-bold text-xl">L</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Lexi<span className="text-slate-500">Guard</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-2 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-200 ${
                currentPage === item.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500 border border-gray-200">BETA</span>
            <button 
              className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400"
              onClick={() => onNavigate('settings')}
            >
               <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" />
            </button>
        </div>
      </div>
    </header>
  );
};