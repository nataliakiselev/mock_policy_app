import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { AuthContext } from '../context/auth-context';
import LoginForm from '../components/login-form';

function Auth() {
  const { login } = useContext(AuthContext);
  const { addToast } = useToasts();
  let history = useHistory();

  const headers = {
    environment: 'mock',
    'Content-type': 'application/json',
  };
  const AUTH_URL = 'https://api.bybits.co.uk/auth/token';

  async function auth(data) {
    try {
      const response = await fetch(AUTH_URL, {
        method: 'post',
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { access_token } = await response.json();

        if (!access_token) {
          throw new Error('No access token in response');
        } else {
          login(access_token);
          history.push('/policy');
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
  return <LoginForm authSubmit={auth} />;
}

export default Auth;
