import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Notecontext, config } from '../../../shared';
import { Layout } from '../../../shared/components/Layout';
import { FormInput } from '../../../shared/components/FormControls';

function Login() {
  const URL = config.API_URL;
  const navigate = useNavigate();
  const { logedIn } = useContext(Notecontext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post(`${URL}/user/login`, formData);
      if (response.status === 200) {
        logedIn(formData.email);
        const userData = response.data.user;
        localStorage.setItem('username', `${userData.firstname} ${userData.lastname}`);
        navigate('/profile');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 py-12 mx-auto min-h-[80vh]">
        <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-neutral-800 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="p-10 sm:p-14">
            <div className="text-center mb-12 space-y-2">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Welcome</h1>
              <p className="text-gray-500 dark:text-neutral-400 font-medium">Log in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
              />

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-black uppercase text-gray-500 dark:text-neutral-400">Password</label>
                  <button type="button" className="text-xs font-black text-amber-600 hover:text-amber-700 uppercase tracking-widest">Forgot?</button>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-950 border border-gray-100 dark:border-neutral-800 rounded-2xl text-gray-800 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-hidden font-medium"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-in shake-in duration-300">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gray-900 dark:bg-amber-500 text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
              >
                {isSubmitting ? 'Verifying...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-neutral-800 text-center">
              <p className="text-gray-500 dark:text-neutral-400 font-medium">
                New here?{' '}
                <NavLink to="/signup" className="text-amber-600 font-black hover:underline uppercase tracking-widest text-sm">
                  Create account
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
