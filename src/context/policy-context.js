import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { AuthContext } from './auth-context';
export const PolicyContext = createContext({
  fetchPolicy: () => {},
  loaded: false,
  loading: false,
  error: null,
  policyDetails: null,
});
export const PolicyDetailsProvider = props => {
  const [policyDetails, setPolicyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { logout, token } = useContext(AuthContext);
  const { addToast } = useToasts();
  const POLICY_URL = 'https://api.bybits.co.uk/policys/details';

  const fetchPolicyDetails = useCallback(async () => {
    if (loaded) {
      return;
    } else {
      setLoading(true);
    }

    const headers = {
      environment: 'mock',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(POLICY_URL, {
        headers,
      });
      console.log('response', response);
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setPolicyDetails(data);
      } else {
        if (response.status === 401) {
          logout();
        }
        throw response;
      }
    } catch (err) {
      console.log('error in policy call ', err);
      setError(err.message || 'failed to fetch policy details');
      addToast(
        `${err.message || err.statusText || 'Failed to fetch policy details'}`,
        {
          appearance: 'error',
        },
      );
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }, [addToast, loaded, logout, token]);

  useEffect(() => {
    if (token && !loaded) {
      fetchPolicyDetails();
    }
    if (!token) {
      setLoaded(false);
    }
  }, [policyDetails, fetchPolicyDetails, loaded, token]);
  return (
    <PolicyContext.Provider
      value={{
        policyDetails,
        loading,
        error,
        fetchPolicyDetails,
      }}
    >
      {props.children}
    </PolicyContext.Provider>
  );
};
