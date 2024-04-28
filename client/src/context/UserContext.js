"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();


export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fiveMinBidNotificationMsg, setFiveMinBidNotificationMsg] = useState("")

  useEffect(()=>{
    const userDetails =  localStorage.getItem('userDetails');
    setUser(userDetails ? JSON.parse(userDetails) : null)
  },[])

  return (
    <UserContext.Provider value={{ user, setUser, setFiveMinBidNotificationMsg, fiveMinBidNotificationMsg }}>
      {children}
    </UserContext.Provider>
  );
};
