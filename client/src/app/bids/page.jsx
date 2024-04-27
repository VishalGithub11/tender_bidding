"use client"
import React, { useState, useEffect } from 'react';
import BidList from '../components/BidList';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const Bids = () => {

   const {user} = useUser()
   const router = useRouter();

   const [bids, setBids] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
     if (user && user.role !== 'admin') {
       router.push("/");
     }
   }, [user]);

    useEffect(() => {
        const fetchBids = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8738/api/bid/getAll',{
                    method: 'GET',
                    headers: {
                      'Authorization': `${localStorage.getItem('token')}` 
                    },
                  });
                if (!response.ok) {
                    throw new Error('Failed to fetch bid data');
                }
                const data = await response.json();
                setBids(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, []);

    console.log("bids",bids);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {  <BidList bids={bids} />}
        </div>
    );
};

export default Bids;
