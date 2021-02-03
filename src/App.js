import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Auth from './pages/auth';
import PolicyDetails from './pages/policy-details';
import NotFound from './pages/not-found';
import ProtectedRoute from './protected-route';
import { LoadingSpinner } from './components/lib';

function App() {
  return (
    <Router>
      <Switch>
        <ErrorBoundary fallback={<LoadingSpinner />}>
          <Route exact path="/auth" component={Auth} />
          <ProtectedRoute exact path="/policy" component={PolicyDetails} />
          <Redirect to="/auth" />
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
