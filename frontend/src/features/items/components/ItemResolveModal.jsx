import axios from 'axios';
import { Notecontext, config } from '../../../shared';
import { useContext } from 'react';

const Itemresolve = ({ message = "no message is given", resolvingUsername = "Unknown", myphoto, itemId, resolvingEmail, resolverEmail, id, getItem }) => {
  const URL = config.API_URL;
  const { getData } = useContext(Notecontext);

  const movetodocument = async () => {
    try {
      const resolverusername = localStorage.getItem("username");
      const resolvingusername = resolvingUsername;
      const itemid = itemId;
      const resolvingemail = resolvingEmail;
      const resolveremail = resolverEmail;
      const type = "allow";

      await axios.post(`${URL}/resolving/creatediscardedResolution`, { resolverusername, resolvingusername, itemid, resolvingemail, resolveremail, type });
      await axios.post(`${URL}/movingitem`, { ResolvingUsername: resolvingusername, selectedId: itemid, ResolvingEmail: resolvingemail, ResolverEmail: resolveremail, notificationId: id });

      getItem();
      getData();
      alert("Item successfully resolved!");
    } catch (error) {
      console.error(error);
      alert("Resolution failed.");
    }
  }

  const DontAllow = async () => {
    try {
      const resolverusername = localStorage.getItem("username");
      const type = "dontallow";
      await axios.post(`${URL}/resolving/creatediscardedResolution`, { resolverusername, resolvingusername: resolvingUsername, itemid: itemId, resolvingemail: resolvingEmail, resolveremail: resolverEmail, type });
      await axios.post(`${URL}/resolving/discardResolvingItem`, { id });
      getItem();
      alert("Request discarded.");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center h-full group">
      <div className="mb-6 relative">
        <div className="w-24 h-24 rounded-3xl overflow-hidden ring-8 ring-amber-500/5 group-hover:ring-amber-500/10 transition-all duration-500 shadow-xl">
          <img
            src={myphoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${resolvingUsername}`}
            alt={resolvingUsername}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-xl shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </div>
      </div>

      <div className="space-y-1 mb-6 flex-1">
        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{resolvingUsername}</h3>
        <p className="text-xs font-black text-amber-500 uppercase tracking-widest">Wants to resolve</p>
        <div className="mt-4 p-4 bg-gray-50 dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-800 italic text-sm text-gray-600 dark:text-neutral-400">
          "{message}"
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 w-full">
        <button
          onClick={movetodocument}
          className="w-full py-4 bg-gray-900 dark:bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
        >
          Confirm
        </button>
        <button
          onClick={DontAllow}
          className="w-full py-4 bg-gray-50 dark:bg-neutral-800 text-gray-400 dark:text-neutral-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:text-red-500 transition-all active:scale-95"
        >
          Ignore
        </button>
      </div>
    </div>
  );
}

export default Itemresolve;
