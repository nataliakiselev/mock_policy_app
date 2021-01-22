import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { AuthContext } from './context/auth-context';
import LoginForm from './components/login-form';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const { addToast } = useToasts();

  const headers = {
    environment: 'mock',
    'Content-type': 'application/json',
  };
  const AUTH_URL = 'https://api.bybits.co.uk/auth/token';

  async function auth(data) {
    try {
      console.log(data, 'data');
      console.log(JSON.stringify(data), 'body');
      const response = await fetch(AUTH_URL, {
        method: 'post',
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { access_token } = await response.json();
        console.log('access_token', access_token);
        if (!access_token) {
          throw new Error('No access token in response');
        } else {
          login(access_token);
        }
      } else {
        throw response;
      }
    } catch (err) {
      console.log('error in auth call', err);

      addToast(`${err.message || err.statusText || 'Failed to login'}`, {
        appearance: 'error',
      });
    }
  }
  return <LoginForm onSubmit={auth} />;
}

export default LoginPage;
