import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { config } from '../../../shared';
import { FormInput, FormTextArea, FormFileDrop } from '../../../shared/components/FormControls';

const ReportLostItem = () => {
  const navigate = useNavigate();
  const URL = config.API_URL;

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phoneNumber: '',
    description: '',
    founderName: '',
    message: ''
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
        alert("Please upload an image of the item.");
        return;
    }
    setIsSubmitting(true);
    try {
      const userEmail = localStorage.getItem('email');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('location', formData.location);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('description', formData.description);
      data.append('founderName', formData.founderName);
      data.append('message', formData.message);
      data.append('type', 'lost');
      data.append('userTrack', `insertedBy${userEmail}`);
      data.append('image', file);

      await axios.post(`${URL}/products/report`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Lost item reported successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error reporting item:', error);
      alert(error.response?.data?.message || 'Failed to report item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggedIn = !!localStorage.getItem('email');

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight">
          Report <span className="text-red-500">Lost Item</span>
        </h1>
        <p className="text-gray-500 dark:text-neutral-400 max-w-xl mx-auto font-medium">
          Provide as much detail as possible to help the community identify and return your missing possession.
        </p>
      </div>

      {!isLoggedIn && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-amber-700 dark:text-amber-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="font-bold">Please sign in before reporting items to track your submissions.</p>
          </div>
          <NavLink to="/login" className="px-6 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors">Login</NavLink>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-black">1</div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Your Details</h2>
          </div>

          <FormInput
            label="Full Name"
            name="founderName"
            value={formData.founderName}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
            required
          />
          <FormInput
            label="Phone Number (10 digits)"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="e.g. 9876543210"
            required
            pattern="\d{10}"
          />

          <div className="md:col-span-2 flex items-center gap-4 mt-8">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-black">2</div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Item Information</h2>
          </div>

          <div className="md:col-span-2">
            <FormInput
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="What did you lose? (e.g. Blue Wallet)"
              required
            />
          </div>

          <div className="md:col-span-2">
            <FormFileDrop
              label="Upload Item Image"
              onFileSelect={handleFileSelect}
              previewUrl={previewUrl}
              onClear={() => { setFile(null); setPreviewUrl(''); }}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              label="Last Seen At"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Central Park, New York"
              required
            />
          </div>

          <div className="md:col-span-2">
            <FormTextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe colors, marks, brand, etc."
              required
            />
          </div>

          <div className="md:col-span-2">
            <FormTextArea
              label="Message to Finder"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="What should someone do if they find it?"
            />
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 dark:border-neutral-800">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-gray-800 dark:text-white">Ready to post?</p>
            <p className="text-sm text-gray-500 dark:text-neutral-400">By submitting, you agree to our community guidelines.</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-12 py-4 bg-gray-900 dark:bg-amber-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Reporting...' : 'Report Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportLostItem;
