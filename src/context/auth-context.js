import React, { createContext, useState, useCallback, useEffect } from 'react';

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
    localStorage.removeItem('token');
    setToken(null);
  }, [setToken]);

  // useEffect(()=>{
  //   if(token === null){

  //   }
  // })

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
