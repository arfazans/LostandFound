import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LostItemCard, FoundItemCard } from '../../items';
import { useNavigate } from 'react-router-dom';
import { Notecontext, config, AppContext } from '../../../shared';

function UserDetailCard() {
  const URL = config.API_URL;
  const { searchkey } = useContext(AppContext);
  const { logedOut } = useContext(Notecontext);

  const [profileImage, setProfileImage] = useState(localStorage.getItem('Image'));
  const [products, setproducts] = useState([]);
  const [filterItem, setFilterItem] = useState('all');
  const [mode, setMode] = useState('Edit Profile');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setInputValue(storedUsername);
    }
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      const res = await axios.get(`${URL}/products`);
      setproducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = async () => {
    if (mode === 'Edit Profile') {
      localStorage.setItem('usernamebeforeedit', localStorage.getItem('username'));
      setMode('Save Changes');
    } else {
      if (inputValue.trim()) {
        localStorage.setItem('username', inputValue);
        setUsername(inputValue);
        try {
          const currentUsername = localStorage.getItem('usernamebeforeedit');
          await axios.put(`${URL}/movingitem/updateusernamefrombackend`, { inputValue, currentUsername });
        } catch (error) {
          console.error("Error updating username:", error);
        }
      }
      if (profileImage) localStorage.setItem('Image', profileImage);
      setMode('Edit Profile');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const userEmail = localStorage.getItem('email');
  const userProducts = products.filter(p => p.userTrack === `insertedBy${userEmail}`);

  return (
    <div className='max-w-6xl mx-auto'>
      <div className="relative h-48 bg-linear-to-r from-amber-500 to-orange-600 rounded-3xl mb-24 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-neutral-900 shadow-2xl bg-gray-100">
              <img
                src={profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {mode === 'Save Changes' && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-[2.5rem] cursor-pointer animate-in fade-in transition-all">
                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="text-center space-y-4 mb-12">
        {mode === 'Edit Profile' ? (
          <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            {username || 'Community Hero'}
          </h1>
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-4xl font-black text-center text-amber-600 bg-transparent border-b-4 border-amber-500 focus:outline-hidden max-w-md mx-auto uppercase tracking-tight"
            autoFocus
          />
        )}
        <p className="text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm">{userEmail}</p>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <button
            onClick={handleModeChange}
            className={`px-8 py-3 rounded-2xl font-black transition-all shadow-lg active:scale-95 ${mode === 'Edit Profile'
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
          >
            {mode}
          </button>
          <button
            onClick={() => { logedOut(); navigate('/'); }}
            className="px-8 py-3 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 rounded-2xl font-black transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-neutral-800 pb-8">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Your Submissions</h2>
          <div className="inline-flex p-1 bg-gray-200 dark:bg-neutral-800 rounded-2xl shadow-inner">
            {['all', 'lost', 'found'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterItem(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${filterItem === tab
                  ? 'bg-white dark:bg-neutral-700 text-amber-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-neutral-400'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-200 dark:bg-neutral-800 rounded-3xl"></div>)}
          </div>
        ) : userProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProducts
              .filter(p => {
                const matchesSearch = p.name.toLowerCase().includes(searchkey.toLowerCase());
                const matchesFilter = filterItem === 'all' || p.type === filterItem;
                return matchesSearch && matchesFilter;
              })
              .map(p => (
                p.type === 'lost'
                  ? <LostItemCard key={p._id} {...p} imageUrl={p.image} />
                  : <FoundItemCard key={p._id} {...p} imageUrl={p.image} />
              ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50 dark:bg-neutral-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-neutral-800">
            <p className="text-gray-500 dark:text-neutral-400 font-bold uppercase tracking-widest">You haven't reported any items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetailCard;
