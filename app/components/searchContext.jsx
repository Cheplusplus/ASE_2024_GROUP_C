'use client'
// context.js
import React, { createContext, useState, useContext } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isTrue, setIsTrue] = useState(true);

  const toggleValue = () => {
    setIsTrue((prevState) => !prevState);
  };

  return (
    <MyContext.Provider value={{ isTrue, toggleValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
