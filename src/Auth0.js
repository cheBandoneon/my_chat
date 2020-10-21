import React, { useState, useEffect }   from 'react';
import App                              from './App';
import { Auth0Provider }                from '@auth0/auth0-react';
import { fetchAuth0Credentials }        from './_services/userService';


function Auth0() {

  const [credentials, setCredentials] = useState('');

  useEffect( () => {
    getAuth0Creds();
  }, []);

  const getAuth0Creds = async () => {
    setCredentials( await fetchAuth0Credentials() );
  }

  return (
    credentials ? 
      <Auth0Provider
        domain = {credentials.domain}
        clientId = {credentials.client_id}
        redirectUri = {window.location.origin}
      >
        <App />
      </Auth0Provider>
    :
      ''
  );
}

export default Auth0;
