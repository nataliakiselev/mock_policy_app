import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { ToastProvider } from 'react-toast-notifications';
import theme from '../theme';
import { AuthProvider } from './auth-context';
import { PolicyDetailsProvider } from './policy-context';

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ToastProvider autoDismiss={true}>
          <AuthProvider>
            <PolicyDetailsProvider>{children}</PolicyDetailsProvider>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </ThemeProvider>
  );
}

export { AppProviders };
