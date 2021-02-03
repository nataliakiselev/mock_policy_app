import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from './context/auth-context';

const ProtectedRoute = props => {
  const { token } = useContext(AuthContext);

  if (!token) return <Redirect to="/auth" />;

  return <Route {...props} />;
};

export default ProtectedRoute;
