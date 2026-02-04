import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../../../shared';

const ResolutionModal = ({ isOpen, onClose, type, name, _id, imageUrl, userTrack }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const URL = config.API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resolvingUsername = localStorage.getItem('username');
      const resolvingEmail = localStorage.getItem('email');
      const myphoto = localStorage.getItem('Image');
      const itemId = _id;
      // Extract original poster's email from userTrack
      const resolverEmail = userTrack ? userTrack.replace('insertedBy', '') : '';

      if (!resolverEmail) {
          alert("Error: Original poster's email not found.");
          return;
      }

      await axios.post(`${URL}/resolving/createResolvingItem`, {
        message,
        resolvingUsername,
        myphoto,
        itemId,
        resolvingEmail,
        resolverEmail
      });
      alert('Resolution request sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending resolution:', error);
      alert('Failed to send resolution request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="relative h-32 bg-linear-to-r from-amber-500 to-orange-600 p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-2xl font-black text-white mt-4">Resolution Request</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-2xl">
            <img src={imageUrl} alt={name} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <p className="text-xs font-black uppercase text-gray-400 dark:text-neutral-500">Item</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white leading-tight">{name}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase text-gray-500 dark:text-neutral-400">Message to the {type === 'lost' ? 'Owner' : 'Finder'}</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. I have found your item and would like to return it..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl text-gray-800 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all min-h-[120px] outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResolutionModal;
