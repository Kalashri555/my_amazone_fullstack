import React, { use } from 'react'
import { getUser } from '../../services/userServices'
import { Outlet } from 'react-router-dom'
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  
  return getUser() ? (
     <Outlet />
   ) :  (<Navigate to="/login"  state={{ from: location.pathname}} />
   );
}

export default ProtectedRoute;
