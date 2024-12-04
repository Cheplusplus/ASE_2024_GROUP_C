'use client'
// context.js
import React, { createContext, useState, useContext,useEffect } from "react";

const MyContext3 = createContext();

export const MyContextProvider3 = ({ children }) => {

    const [favourites, setFavourites] = useState([]);
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
    useEffect(() => {
    
        fetchFavourites();
      
    }, []);

    const fetchFavourites = async () => {
        try {
          const response = await fetch(`${url}/api/favourites`);
          if (!response.ok) throw new Error('Failed to fetch favourites');
          const data = await response.json();
          setFavourites(data.favourites);
        } catch (error) {
          console.error('Error fetching favourites:', error);
        } 
      };

  return (
    <MyContext3.Provider value={{ favourites }}>
      {children}
    </MyContext3.Provider>
  );
};

export const useMyContext3 = () =>{ return useContext(MyContext3)};
