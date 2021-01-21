import React, { useContext } from 'react';
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@material-ui/core';
import { AuthContext } from './context/auth-context';
import PolicyDetails from './pages/policy-details';
import NotFound from './pages/not-found';
import { CircularProgress } from '@material-ui/core';
import PageFrame from './components/page-frame';

function AuthenticatedApp() {
  const { logout } = useContext(AuthContext);
  return (
    <PageFrame>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
      <ErrorBoundary fallback={<CircularProgress />}>
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
