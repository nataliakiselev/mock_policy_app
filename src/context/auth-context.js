import React, { createContext, useState, useCallback } from 'react';
// import * as auth from '../auth-provider';

export const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = props => {
  const [token, setToken] = useState(false);

  const login = useCallback(
    token => {
      console.log('token', token);
      localStorage.setItem('token', token);
      console.log('tokenstored');
      setToken(token);
    },
    [setToken],
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('access_token');
  }, [setToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
