import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from './context/auth-context';

const ProtectedRoute = props => {
  const { type = 'private' } = props;
  const { token } = useContext(AuthContext);
  // if (type === "guest" && isAuthedUser) return <Redirect to="/home" />;
  // else
  console.log('token', token);
  if (type === 'private' && !token) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default ProtectedRoute;
