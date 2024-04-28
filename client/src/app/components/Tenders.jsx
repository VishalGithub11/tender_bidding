"use client"
import React, { useState, useEffect } from 'react';
import BidForm from './BidFom';
import { useUser } from '@/context/UserContext';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [bidResponse, setBidResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {setFiveMinBidNotificationMsg, fiveMinBidNotificationMsg} = useUser();

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
    if(bidResponse?.isBidPlacedInLast5Min){
      setFiveMinBidNotificationMsg(`${bidResponse?.tender} tender end time increased by buffer time`)
    }
  }, [bidResponse]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Tender List</h1>

      {/* Notification bar */}
      {fiveMinBidNotificationMsg && (
     <div className="bg-green-200 rounded-md p-3 mt-3 relative">
     <button
         className="absolute top-0 right-0 p-1"
         onClick={() => setFiveMinBidNotificationMsg("")}
     >
         <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-4 w-4 text-gray-600"
             viewBox="0 0 20 20"
             fill="currentColor"
         >
             <path
                 fillRule="evenodd"
                 d="M13.414 10l4.293 4.293a1 1 0 01-1.414 1.414L12 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414L12 8.586l4.293-4.293a1 1 0 111.414 1.414L13.414 10z"
                 clipRule="evenodd"
             />
         </svg>
     </button>
     <p>{fiveMinBidNotificationMsg}</p>
 </div>
)}
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
               {tender?.userBid?.hasBid ? `You Bidded @ ${tender?.userBid?.price}` : <BidForm tenderId={tender._id} setBidResponse={setBidResponse}/> }
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
