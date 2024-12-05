'use client'
// context.js
import React, { createContext, useState, useContext,useEffect } from "react";

const MyContext4 = createContext();

export const MyContextProvider4 = ({ children }) => {
  const [notify, setNotify] = useState(false);


  const NotifyFunc = (increment) => {
    
       if(increment){
          setNotify(true)
       }
       else{
        setNotify(false)
       }
  };


  return (
    <MyContext4.Provider value={{ notify,NotifyFunc }}>
      {children}
    </MyContext4.Provider>
  );
};

export const useMyContext4 = () =>{ return useContext(MyContext4)};