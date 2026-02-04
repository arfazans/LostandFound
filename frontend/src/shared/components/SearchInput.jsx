import React from 'react';

export const SearchInput = ({
  value, 
  onChange, 
  onKeyDown, 
  placeholder = "Search items...",
  className = "",
  autoFocus = false 
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
        <svg className="w-4 h-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <input
        type="text"
        className="w-full py-2.5 ps-11 pe-4 block bg-gray-100 dark:bg-neutral-800 border-transparent rounded-2xl text-sm font-medium focus:bg-white dark:focus:bg-neutral-950 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-hidden dark:text-neutral-200 dark:placeholder:text-neutral-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
    </div>
  );
};
