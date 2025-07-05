import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BusinessCard({ data, setBusinessData }) {
  const { name, location, rating, reviews, headline } = data;

  const [displayHeadline, setDisplayHeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiTip, setAiTip] = useState('');

  const aiTips = [
    "Boost your visibility by updating your Google Business profile weekly.",
    "Respond to customer reviews quickly to build trust.",
    "Add high-quality photos to attract more clicks.",
    "Use local keywords to improve your SEO ranking.",
    "Keep your business hours updated to gain customer confidence."
  ];

  useEffect(() => {
    setDisplayHeadline('');
    let fullHeadline = `"${headline}`; // Include quotes in typing
    let i = 0;

    const typing = setInterval(() => {
      if (i < fullHeadline.length) {
        setDisplayHeadline((prev) => prev + fullHeadline.charAt(i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);

    setAiTip(aiTips[Math.floor(Math.random() * aiTips.length)]);

    return () => clearInterval(typing);
  }, [headline]);

  const regenerateHeadline = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://business-dashboard-1.onrender.com/regenerate-headline`, {
        params: { name, location }
      });

      setTimeout(() => {
        setBusinessData({ ...data, headline: response.data.headline });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error regenerating headline', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 text-lg">{location}</p>
      <p className="text-yellow-500 text-xl font-semibold">⭐ {rating} / 5</p>
      <p className="text-gray-700">{reviews} Reviews</p>

      {isLoading ? (
        <div className="text-blue-500 font-semibold text-lg animate-pulse">Generating Headline...</div>
      ) : (
        <div
          className="italic text-blue-700 font-medium min-h-[3rem] overflow-hidden whitespace-pre font-mono text-center"
          style={{ minWidth: '320px' }} // Stable layout
        >
          {displayHeadline.length > 0 ? displayHeadline : '\u00A0'}
        </div>
      )}

      <button
        onClick={regenerateHeadline}
        className={`mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-6 rounded-lg 
          hover:scale-105 hover:from-green-600 hover:to-emerald-600 transition duration-300 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Regenerate SEO Headline'}
      </button>

      
    </div>
  );
}

export default BusinessCard;
