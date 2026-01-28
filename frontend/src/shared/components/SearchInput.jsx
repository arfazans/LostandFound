import React from 'react';

const SearchInput = ({ 
  value, 
  onChange, 
  onKeyDown, 
  placeholder = "Search", 
  className = "",
  autoFocus = false 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
        <svg className="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <input
        type="text"
        className="py-2 ps-10 pe-4 block w-full bg-transparent border-white rounded-lg text-sm focus:outline-hidden focus:border-white focus:ring-1 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-neutral-600"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default SearchInput;