import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AppContext, config } from '../../../shared';
import ResolvedLostItemCard from './ResolvedLostItemCard';
import ResolvedFoundItemCard from './ResolvedFoundItemCard';

const ResolvedItemsList = () => {
  const [resolvedItems, setResolvedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { searchkey } = useContext(AppContext);
  const URL = config.API_URL;

  const fetchResolvedItems = async () => {
    try {
      const response = await axios.get(`${URL}/movingitem`);
      setResolvedItems(response.data);
    } catch (error) {
      console.error('Error fetching resolved items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResolvedItems();
  }, []);

  const filteredItems = useMemo(() => {
    return resolvedItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchkey.toLowerCase());
      const matchesFilter = filter === 'all' || item.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [resolvedItems, searchkey, filter]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Success Stories</h1>
          <p className="text-gray-500 dark:text-neutral-400 font-medium">Items that have been successfully reunited with their owners.</p>
        </div>

        <div className="inline-flex p-1 bg-gray-200 dark:bg-neutral-800 rounded-2xl">
          {['all', 'lost', 'found'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${filter === type
                  ? 'bg-white dark:bg-neutral-700 text-amber-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-neutral-400'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-80 bg-gray-200 dark:bg-neutral-800 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            item.type === 'lost'
              ? <ResolvedLostItemCard key={item._id} {...item} imageUrl={item.image} />
              : <ResolvedFoundItemCard key={item._id} {...item} imageUrl={item.image} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white dark:bg-neutral-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-neutral-800">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">No resolved items yet</h3>
          <p className="text-gray-500 dark:text-neutral-400">When items are returned, they'll appear here as success stories!</p>
        </div>
      )}
    </div>
  );
};

export default ResolvedItemsList;
