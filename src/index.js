import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-g10vy9jy.eu.auth0.com';
const clientId = 'cCSmKoZmO1xitbegmW994642n7ueQdTQ';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      redirectUri = {window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

