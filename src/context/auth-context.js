import React, { createContext, useState, useCallback } from 'react';

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
      localStorage.setItem('token', token);
      setToken(token);
    },
    [setToken],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
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
