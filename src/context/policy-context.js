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
  policyDetails: {},
});

export const PolicyDetailsProvider = props => {
  const [policyDetails, setPolicyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { logout, token } = useContext(AuthContext);
  const { addToast } = useToasts();

  const POLICY_URL = 'https://api.bybits.co.uk/policys/details';

  const headers = {
    environment: 'mock',
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchPolicyDetails = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(POLICY_URL, {
        // method: "post",
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
      console.log('loaded set', loaded);
    }
  });

  useEffect(() => {
    console.log('inuseeffect');
    //if (!loaded) {
    fetchPolicyDetails();
    //}
  }, [policyDetails, fetchPolicyDetails, token]);

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
