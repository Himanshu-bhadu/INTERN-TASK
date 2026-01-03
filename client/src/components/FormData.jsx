import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const FormData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!formData.name) err.name = "Name is required.";
    if (!formData.email) {
        err.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        err.email = "Email is invalid.";
    }
    if (!formData.phone) err.phone = "Phone is required.";
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!validate()) return;

    try {
      await api.post('/contacts', formData);
      
      toast.success('Message Sent Successfully!');
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (err) {
      toast.error('Failed to send message.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
        <button 
          onClick={() => navigate('/entries')}
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline cursor-pointer"
        >
          View All Entries &rarr;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" name="name" value={formData.name} onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input 
              type="text" name="phone" value={formData.phone} onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
          <textarea 
            name="message" value={formData.message} onChange={handleChange} rows="3"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button 
          type="submit" 
          disabled={!formData.name || !formData.email || !formData.phone}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Submit Contact
        </button>
      </form>
    </div>
  );
};

export default FormData;