import React from 'react';
import { GovernanceScore } from '../types';

interface Props {
  data: GovernanceScore;
}

export const GovernanceGauge: React.FC<Props> = ({ data }) => {
  const { rating, esg_notes } = data;
  
  // Determine color based on score
  let color = 'text-red-500';
  let bgColor = 'bg-red-500';
  if (rating >= 80) {
    color = 'text-emerald-600';
    bgColor = 'bg-emerald-600';
  } else if (rating >= 50) {
    color = 'text-amber-500';
    bgColor = 'bg-amber-500';
  }

  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (rating / 100) * circumference;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-between h-full shadow-sm">
      <div className="w-full flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
         <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Governance & ESG</h3>
         <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-opacity-10 ${bgColor} ${color}`}>
            Score
         </span>
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset: 0 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-gray-100"
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className={`absolute text-2xl font-bold ${color}`}>{rating}</span>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 leading-snug">{esg_notes}</p>
      </div>
    </div>
  );
};