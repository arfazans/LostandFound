import React from 'react';

export const Button = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20",
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-black transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
