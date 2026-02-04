import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notecontext, config } from '../../../shared';
import { Layout } from '../../../shared/components/Layout';
import { FormInput } from '../../../shared/components/FormControls';

function Signup() {
  const URL = config.API_URL;
  const navigate = useNavigate();
  const { logedIn } = useContext(Notecontext);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    'confirm-password': ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validatePassword = () => {
    if (data.password !== data['confirm-password']) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${URL}/user/signUp`, data);
      logedIn(data.email);
      const userData = response.data.user;
      localStorage.setItem('username', `${userData.firstname} ${userData.lastname}`);
      navigate('/profile');
    } catch (error) {
      console.error("Signup error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 py-12 mx-auto min-h-[80vh]">
        <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-neutral-800 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="p-10 sm:p-14">
            <div className="text-center mb-12 space-y-2">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Join Us</h1>
              <p className="text-gray-500 dark:text-neutral-400 font-medium">Create your community account</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
              <FormInput
                label="First Name"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
                placeholder="John"
                required
              />
              <FormInput
                label="Last Name"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirm-password"
                value={data['confirm-password']}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <div className="md:col-span-2 flex items-start gap-4 p-4 bg-gray-50 dark:bg-neutral-950 rounded-2xl border border-gray-100 dark:border-neutral-800">
                <input id="terms" type="checkbox" className="mt-1 w-5 h-5 border-gray-200 rounded-lg text-amber-500 focus:ring-amber-500/20" required />
                <label htmlFor="terms" className="text-sm text-gray-500 dark:text-neutral-400 font-medium leading-relaxed">
                  I agree to the <button type="button" className="text-amber-600 font-black hover:underline uppercase tracking-widest text-xs">Terms of Service</button> and <button type="button" className="text-amber-600 font-black hover:underline uppercase tracking-widest text-xs">Privacy Policy</button>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 w-full py-5 bg-gray-900 dark:bg-amber-500 text-white rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-neutral-800 text-center">
              <p className="text-gray-500 dark:text-neutral-400 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-600 font-black hover:underline uppercase tracking-widest text-sm">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup;
