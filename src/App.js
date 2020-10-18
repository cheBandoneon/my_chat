import React, { useState, useEffect }  from 'react';
import { useAuth0 }                     from '@auth0/auth0-react';
import Login                            from './_components/Login/Login.js';
import Chat                             from './_components/Chat/Chat';
import { fetchUserByEmail }             from './_services/userService';
import _                                from 'lodash';
import './App.css';

function App() {

  const { user, isAuthenticated } = useAuth0();
  const [ localUser, setLocalUser ] = useState('');

  useEffect( () => {
    if( user ) {
      getSingleUser();
    }
  }, [user]);

  const getSingleUser = async () => {
    setLocalUser( await fetchUserByEmail(user.email) );
  };

  return (
    <div className="App">
      {
        isAuthenticated && localUser
        ?
          <Chat 
            user={localUser}
          />
        :
          <Login />
      }
    </div>
  );
}

export default App;
