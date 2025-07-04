import React, { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';

function App() {
  const [businessData, setBusinessData] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        GrowthProAI - Local Business Dashboard
      </h1>
      <div className="w-full max-w-lg">
        <BusinessForm setBusinessData={setBusinessData} />
        {businessData && (
          <div className="mt-6">
            <BusinessCard data={businessData} setBusinessData={setBusinessData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
