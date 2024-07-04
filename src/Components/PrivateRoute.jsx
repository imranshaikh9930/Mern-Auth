import React, { useContext, useEffect } from 'react'
import { UsersContext } from '../Context/userContext'
import { useNavigate,Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(UsersContext);
    useEffect(()=>{
      if(!currentUser){
        navigate("/login");
      }
    },[])
  return  currentUser ? <Outlet/> : null ;
   
  
}

export default PrivateRoute