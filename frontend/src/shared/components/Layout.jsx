import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { SearchInput } from './SearchInput';
import useNotification from '../hooks/useNotification';
import notificationSound from '../assets/new-notification-09-352705.mp3';

export const Layout = ({ children }) => {
  const { searchkey, setSearchkey, setIsSearchMode } = useContext(AppContext);
  const navigate = useNavigate();
  const { unreadCount } = useNotification(notificationSound);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setIsSearchMode(true);
      navigate('/');
    }
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { to: '/resolvedItems', label: 'Resolved', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )},
    { to: '/reportli', label: 'Report Lost', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    ), highlight: true },
    { to: '/reportfi', label: 'Report Found', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
    )}
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white hidden sm:block">
              Lost<span className="text-amber-500">&</span>Found
            </span>
          </NavLink>

          <div className="flex-1 max-w-md">
            <SearchInput
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="flex items-center gap-2">
            <NavLink to="/notificaiton" className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl relative transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 border-2 border-white dark:border-neutral-900 rounded-full flex items-center justify-center text-[10px] font-bold text-white leading-none">
                  {unreadCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/profile" className="p-1 hover:ring-2 hover:ring-amber-500/20 rounded-full transition-all">
              <img
                className="w-9 h-9 rounded-full bg-gray-200 border border-gray-200 dark:border-neutral-700"
                src={localStorage.getItem('Image') || `https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('username') || 'Guest'}`}
                alt="Profile"
              />
            </NavLink>
          </div>
        </nav>

        <div className="bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 py-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                    ${isActive
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:text-neutral-400'
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="mt-auto py-12 border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-neutral-400 text-sm font-medium">
            © {new Date().getFullYear()} Lost & Found. Helping communities reconnect.
          </p>
        </div>
      </footer>
    </div>
  );
};
