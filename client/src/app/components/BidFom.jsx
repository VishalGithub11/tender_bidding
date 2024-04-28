"use client"
import React, { useState } from 'react';

const BidForm = ({ tenderId, setBidResponse}) => {
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8738/api/bid/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          price: parseInt(price),
          tender: tenderId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      const responseData = await response.json()
      setBidResponse(responseData)
     
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
        min="0"
        className="border border-gray-300 rounded-l-md py-1 px-2 focus:outline-none "
        required
        style={{ width: '80px', fontSize: '0.9rem' }}
      />
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-r-md focus:outline-none ${
          (!price || loading) && 'bg-gray-300 cursor-not-allowed' 
        }`}
        disabled={!price || loading}
        style={{ marginLeft: '-1px' }}
      >
        {loading ? 'Submitting...' : 'Bid'}
      </button>
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </form>
  );
};

export default BidForm;
