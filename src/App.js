import React, { useContext } from 'react';
import { AuthContext } from './context/auth-context';
import AuthenticatedApp from './authenticated-app';
import LoginPage from './pages/login-page';

function App() {
  const { token } = useContext(AuthContext);
  console.log(token, 'app-token');
  return !!token ? <AuthenticatedApp /> : <LoginPage />;
}

export default App;
