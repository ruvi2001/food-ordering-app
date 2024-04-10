import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthRoute( {children }) {
      const location = useLocation(); // to redirect an unathenticated user to the login page
      const { user } = useAuth();     //to verify user is logged in or not

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />  //replace used to remove all the histories
  );
  
}
