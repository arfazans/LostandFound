import React, { useState } from 'react';

export const FormInput = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-black uppercase text-gray-500 dark:text-neutral-400 ml-1">{label}</label>}
    <div className="relative group">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">{icon}</div>}
      <input
        {...props}
        className={`w-full ${icon ? 'pl-12' : 'px-4'} py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-gray-800 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-hidden font-medium`}
      />
    </div>
  </div>
);

export const FormTextArea = ({ label, ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-black uppercase text-gray-500 dark:text-neutral-400 ml-1">{label}</label>}
    <textarea
      {...props}
      className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-gray-800 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all min-h-[120px] outline-hidden font-medium"
    />
  </div>
);

export const FormFileDrop = ({ label, onFileSelect, previewUrl, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-black uppercase text-gray-500 dark:text-neutral-400 ml-1">{label}</label>}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files[0]) onFileSelect(e.dataTransfer.files[0]);
        }}
        className={`relative aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 overflow-hidden group
          ${isDragging ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-neutral-800 hover:border-amber-300 dark:hover:border-amber-800 bg-gray-50 dark:bg-neutral-900'}
        `}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClear(); }}
                className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </>
        ) : (
          <label className="cursor-pointer flex flex-col items-center text-center">
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0])}
              accept="image/*"
            />
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-sm font-bold text-gray-800 dark:text-neutral-200">Click to upload or drag and drop</p>
            <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mt-1">PNG, JPG, WEBP (max. 5MB)</p>
          </label>
        )}
      </div>
    </div>
  );
};
