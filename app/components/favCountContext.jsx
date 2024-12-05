'use client'
// context.js
import React, { createContext, useState, useContext,useEffect } from "react";

const MyContext2 = createContext();

export const MyContextProvider2 = ({ children }) => {
  const [updateCount, setUpdateCount] = useState(false);

    // Fetch favourites count when session changes
    useEffect(() => {
        const fetchFavouritesCount = async () => {
         
            try {
              const response = await fetch('/api/favourites/fav');
              if (response.ok) {
                const data = await response.json();
                setUpdateCount(data.count);
              }
            } catch (error) {
              console.error('Error fetching favourites count:', error);
            }
         
        };
    
        fetchFavouritesCount();
      }, []);

  const updateFavCount = (increment) => {
    
       if(increment){
          setUpdateCount(prev=>prev-1)
       }
       else{
        setUpdateCount(prev=>prev+1)
       }
  };


  const countZero =()=>{
    setUpdateCount(0)
  }

  return (
    <MyContext2.Provider value={{ updateCount, updateFavCount,countZero }}>
      {children}
    </MyContext2.Provider>
  );
};

export const useMyContext2 = () =>{ return useContext(MyContext2)};