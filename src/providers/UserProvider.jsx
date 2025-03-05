import React, { createContext,useContext, useState,useEffect } from 'react';
import { axiosClient2 } from '../api/axios';

const UserContext  = createContext(null);

const UserProvider = ({ children }) => {
    // const id=localStorage.getItem("user_id")
    const [data ,setData]=useState([])
    const [count ,setCount]=useState(0)


  
  useEffect(()=>{
    fetchNotification()
  },[count])



  const fetchNotification=async()=>{
    const response = await axiosClient2.get("/api/notification");
    setData(response.data.notification)
    console.log(response.data.notification)

    
  }

    

  const contextValues ={
    data,
    count,
    setCount,
  }
  
  return (
    <UserContext.Provider value={contextValues}     >
      {children}
    </UserContext.Provider>
  );


};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider ,useUserContext };
