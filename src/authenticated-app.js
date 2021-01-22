import React, { useContext } from 'react';
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@material-ui/core';
import { AuthContext } from './context/auth-context';
import PolicyDetails from './pages/policy-details';
import NotFound from './pages/not-found';
import PageFrame from './components/page-frame';
import { LoadingSpinner } from './components/lib';

function AuthenticatedApp() {
  const { logout } = useContext(AuthContext);
  return (
    <PageFrame>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
      <ErrorBoundary fallback={<LoadingSpinner />}>
        <AppRoutes />
      </ErrorBoundary>
    </PageFrame>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Switch>
        <Route path="/" component={PolicyDetails} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Routes>
  );
}
export default AuthenticatedApp;
