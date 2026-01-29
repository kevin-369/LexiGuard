import React from 'react';
import { RiskMatrix as RiskMatrixType } from '../types';

interface Props {
  data: RiskMatrixType;
}

const RiskCard = ({ title, items, colorClass, badgeClass }: { title: string, items: string[], colorClass: string, badgeClass: string }) => (
  <div className={`p-4 rounded-lg border ${colorClass} bg-white shadow-sm flex flex-col h-full`}>
    <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${badgeClass}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {title}
    </h3>
    <ul className="space-y-2 flex-grow">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <li key={idx} className="text-sm text-slate-700 leading-relaxed border-b border-gray-50 last:border-0 pb-2 last:pb-0">
            {item}
          </li>
        ))
      ) : (
        <li className="text-sm text-slate-400 italic">No specific risks identified.</li>
      )}
    </ul>
  </div>
);

export const RiskMatrix: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <RiskCard 
        title="High Priority" 
        items={data.high_priority} 
        colorClass="border-red-100" 
        badgeClass="text-red-600"
      />
      <RiskCard 
        title="Medium Priority" 
        items={data.medium_priority} 
        colorClass="border-orange-100" 
        badgeClass="text-orange-500"
      />
      <RiskCard 
        title="Low Priority" 
        items={data.low_priority} 
        colorClass="border-blue-100" 
        badgeClass="text-blue-500"
      />
    </div>
  );
};