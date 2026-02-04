import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification, config } from '../../../shared';
import GeneralMessages from './GeneralMessages';
import { Layout } from '../../../shared/components/Layout';
import ItemResolveModal from '../../items/components/ItemResolveModal';
import notificationSound from '../../../shared/assets/new-notification-09-352705.mp3';

function Notification() {
  const URL = config.API_URL;
  const [resolutionMessages, setResolutionMessages] = useState([]);
  const [generalMessages, setGeneralMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationType, setNotificationType] = useState("General");

  const { handleGeneralNotificationClick, handleResolutionNotificationClick } = useNotification(notificationSound);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        axios.get(`${URL}/resolving/getAllResolvingItems`),
        axios.get(`${URL}/resolving/getAlldiscardedResolution`)
      ]);
      setResolutionMessages(res1.data);
      setGeneralMessages(res2.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const specificEmail = localStorage.getItem('email');
  const filteredResolutions = resolutionMessages.filter(item => item.resolverEmail === specificEmail);
  const filteredGeneral = generalMessages.filter(item => item.resolvingEmail === specificEmail);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Inbox</h1>
          <p className="text-gray-500 dark:text-neutral-400 font-medium tracking-wide">Stay updated on your reports and resolution requests.</p>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-gray-200 dark:bg-neutral-800 rounded-[2rem] shadow-inner">
            <button
              onClick={() => { setNotificationType("General"); handleGeneralNotificationClick(); }}
              className={`px-10 py-3 rounded-[1.5rem] text-sm font-black transition-all ${notificationType === 'General'
                  ? 'bg-white dark:bg-neutral-700 text-amber-600 shadow-xl shadow-black/5'
                  : 'text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white'
                }`}
            >
              General
            </button>
            <button
              onClick={() => { setNotificationType("Resolution"); handleResolutionNotificationClick(); }}
              className={`px-10 py-3 rounded-[1.5rem] text-sm font-black transition-all ${notificationType === 'Resolution'
                  ? 'bg-white dark:bg-neutral-700 text-amber-600 shadow-xl shadow-black/5'
                  : 'text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white'
                }`}
            >
              Requests
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest animate-pulse">Checking inbox...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notificationType === "General" ? (
              filteredGeneral.length > 0 ? (
                filteredGeneral.map((item, idx) => (
                  <div key={item._id || idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                    <GeneralMessages {...item} getItem={fetchMessages} id={item._id} />
                  </div>
                ))
              ) : (
                <EmptyState message="No new messages in your inbox." />
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResolutions.length > 0 ? (
                  filteredResolutions.map((item, idx) => (
                    <div key={item._id || idx} className="animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                      <ItemResolveModal {...item} getItem={fetchMessages} id={item._id} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full">
                    <EmptyState message="No pending resolution requests." />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

const EmptyState = ({ message }) => (
  <div className="py-24 text-center bg-white dark:bg-neutral-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-neutral-800 shadow-xs">
    <div className="w-20 h-20 bg-gray-50 dark:bg-neutral-800 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-gray-300">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
    </div>
    <p className="text-gray-400 font-bold uppercase tracking-widest">{message}</p>
  </div>
);

export default Notification;
