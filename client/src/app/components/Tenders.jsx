"use client"
import React, { useState, useEffect } from 'react';
import BidForm from './BidFom';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8738/api/tender/getAll', {
            method: 'GET',
            headers: {
              'Authorization': `${localStorage.getItem('token')}` 
            },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTenders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
console.log("tender data", tenders);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Tender List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-800 px-4 py-2">Tender Name</th>
              <th className="border border-gray-800 px-4 py-2">Description</th>
              <th className="border border-gray-800 px-4 py-2">Start Time</th>
              <th className="border border-gray-800 px-4 py-2">End Time</th>
              <th className="border border-gray-800 px-4 py-2">Buffer Time (Minutes)</th>
              <th className="border border-gray-800 px-4 py-2">Bid</th>
            </tr>
          </thead>
          <tbody>
            {tenders?.map((tender) => (
              <tr key={tender._id}>
                <td className="border border-gray-800 px-4 py-2">{tender.name}</td>
                <td className="border border-gray-800 px-4 py-2">{tender.description}</td>
                <td className="border border-gray-800 px-4 py-2">{new Date(tender.startTime).toLocaleString()}</td>
                <td className="border border-gray-800 px-4 py-2">{new Date(tender.endTime).toLocaleString()}</td>
                <td className="border border-gray-800 px-4 py-2">{tender.bufferTimeInMinutes}</td>
                <td className="border border-gray-800 px-4 py-2">
                <div className="flex items-center">
               {tender?.userBid?.hasBid ? `You Bidded @ ${tender?.userBid?.price}` :  <BidForm tenderId={tender._id} /> }
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenderList;
