import React, { createContext,useContext, useState,useEffect } from 'react';
import { axiosClient2 } from '../api/axios';

const SettinContext = createContext(null);

const SettingProvider = ({ children }) => {
    const [setting ,setsetting]=useState([])
    const [reload ,setReload]=useState(0)

  
    useEffect(()=>{
      fetchdata()
      },[reload])
  
  const fetchdata=async()=>{
  try {
      const response= await axiosClient2.get('/api/setting');
      setsetting(response.data);
  } catch (error) {
      console.error(error)
  }
      }

  const contextValues ={
    setting,
    reload,
    setReload,
  }
  return (
    <SettinContext.Provider value={contextValues}     >
      {children}
    </SettinContext.Provider>
  );


};

const useSettingContext= () => {
    return useContext(SettinContext);
};

export { SettingProvider ,useSettingContext};
