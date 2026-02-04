import { FoundItemCard, LostItemCard } from '../../items'
import { useState, useEffect, useContext, useMemo } from 'react'
import { AppContext } from '../../../shared'

function Dashboard() {
  const { products, loading, searchkey, isSearchMode, setIsSearchMode } = useContext(AppContext);
  const [filterItem, setFilterItem] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = isSearchMode ? product.name.toLowerCase().includes(searchkey.toLowerCase()) : true;
      const matchesFilter = filterItem === 'all' || product.type === filterItem;
      return matchesSearch && matchesFilter;
    });
  }, [products, isSearchMode, searchkey, filterItem]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-amber-900/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
            Lost something? <br />
            <span className="text-amber-200 underline decoration-4 underline-offset-8">We'll help you</span> find it.
          </h1>
          <p className="text-lg text-amber-50 font-medium mb-8">
            The community-driven platform to reconnect people with their lost belongings. Fast, secure, and free.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsSearchMode(false)}
              className="px-8 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-amber-50 transition-all shadow-lg active:scale-95"
            >
              Browse Items
            </button>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-orange-500 shadow-sm"
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                  alt="avatar"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                +1k
              </div>
            </div>
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 mr-20 -mb-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl"></div>
      </section>

      {/* Filter & Content */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Recent Activity</h2>
            <p className="text-gray-500 dark:text-neutral-400 font-medium">Browse through items found in your area</p>
          </div>

          <div className="inline-flex p-1 bg-gray-200 dark:bg-neutral-800 rounded-2xl shadow-inner">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'lost', label: 'Lost' },
              { id: 'found', label: 'Found' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterItem(tab.id);
                  setIsSearchMode(false);
                }}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${filterItem === tab.id
                    ? 'bg-white dark:bg-neutral-700 text-amber-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-neutral-800 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              product.type === 'lost'
                ? <LostItemCard key={product._id} {...product} imageUrl={product.image} />
                : <FoundItemCard key={product._id} {...product} imageUrl={product.image} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-neutral-800">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-neutral-400 max-w-xs mx-auto">
              We couldn't find any items matching your search or filter. Try adjusting them.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
