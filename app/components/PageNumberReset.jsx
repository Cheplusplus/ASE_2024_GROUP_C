'use client'
// context.js
import React, { createContext, useState, useContext } from "react";


const MyContext3 = createContext();

export const MyContextProvider3 = ({ children }) => {
  const [reset, setReset] = useState(false);



  const update = (a) => {
    
       setReset(a);
  };

  return (
    <MyContext3.Provider value={{ reset, update }}>
      {children}
    </MyContext3.Provider>
  );
};

export const useMyContext3 = () =>{ return useContext(MyContext3)};