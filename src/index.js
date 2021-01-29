import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProviders } from './context/app-providers';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,

  document.getElementById('root'),
);
