import axios from 'axios';
import React from 'react';
import { config } from '../../../shared';

const GeneralMessages = ({ resolverUsername, resolvingUsername, itemName, id, getItem, type }) => {
  const URL = config.API_URL;

  const deleteMessage = async () => {
    try {
      await axios.post(`${URL}/resolving/deletediscardResolutionMessage`, { id });
      getItem();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const isAccepted = type === "allow";

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 shadow-xs hover:shadow-xl flex items-center gap-6 ${isAccepted
        ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-800/30'
        : 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-800/30'
      }`}>
      <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${isAccepted
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
          : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
        }`}>
        {isAccepted ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <h4 className={`text-lg font-black uppercase tracking-tight ${isAccepted ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
          Request {isAccepted ? 'Accepted' : 'Discarded'}
        </h4>
        <p className="text-gray-600 dark:text-neutral-400 font-medium leading-relaxed">
          Hey <span className="font-black text-gray-900 dark:text-white">{resolvingUsername}</span>, your resolution request for item{' '}
          <span className="font-black text-gray-900 dark:text-white underline decoration-2 underline-offset-4 decoration-amber-500/30">"{itemName}"</span> has been{' '}
          {isAccepted ? 'accepted' : 'discarded'} by <span className="font-black text-gray-900 dark:text-white">{resolverUsername}</span>.
        </p>
      </div>

      <button
        onClick={deleteMessage}
        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all active:scale-90"
        title="Delete message"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  );
}

export default GeneralMessages;
