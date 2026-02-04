import React from 'react';
import { BaseItemCard } from './BaseItemCard';

const ResolvedItemCard = (props) => {
  return (
    <div className="relative group">
      <BaseItemCard
        {...props}
        isResolved={true}
        messageLabel="Resolved By"
      />
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-emerald-500 text-white p-2 rounded-xl shadow-lg shadow-emerald-500/40">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
    </div>
  );
};

export default ResolvedItemCard;
