import React, { useState } from 'react';

export const BaseItemCard = ({
  name,
  description,
  location,
  date,
  imageUrl,
  type,
  contactName,
  contactPhone,
  messageLabel = "Contact",
  onResolve,
  isResolved = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const isLost = type === 'lost';

  return (
    <div className="group bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=600'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${isLost
            ? 'bg-red-500 text-white shadow-red-500/20'
            : 'bg-emerald-500 text-white shadow-emerald-500/20'
            }`}>
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-neutral-400 font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {location}
          </p>
        </div>

        <p className="text-sm text-gray-600 dark:text-neutral-300 line-clamp-2 mb-6 flex-1 italic">
          "{description}"
        </p>

        <div className="space-y-4">
          {showDetails && (
            <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-xs font-black uppercase text-gray-400 dark:text-neutral-500 mb-2">{messageLabel}</p>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-800 dark:text-neutral-200">{contactName || 'Anonymous'}</p>
                <p className="text-sm font-medium text-amber-600">{contactPhone || 'No phone provided'}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 py-3 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-2xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {showDetails ? 'Hide Info' : 'Details'}
            </button>
            {!isResolved && (
              <button
                onClick={onResolve}
                className="px-4 py-3 bg-amber-500 text-white rounded-2xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
