import React, { useState } from 'react';
import axios from 'axios';

function BusinessForm({ setBusinessData }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/business-data', { name, location });
      setBusinessData({ ...response.data, name, location });
    } catch (error) {
      console.error('Error fetching business data', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <div>
        <label className="block mb-2 text-lg font-semibold text-gray-700">Business Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter business name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-lg font-semibold text-gray-700">Location</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg font-semibold py-3 rounded-lg hover:scale-105 hover:from-purple-600 hover:to-indigo-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default BusinessForm;
