import React, { useState, useEffect }   from 'react';
import { Route, Switch }                from "react-router-dom";
import { useAuth0 }                     from '@auth0/auth0-react';
import Login                            from './_components/Login/Login.js';
import Chat                             from './_components/Chat/Chat';
import Sidebar                          from './_components/Sidebar/Sidebar';
import Conversation                     from './_components/Conversation/Conversation';
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
      <Sidebar user={localUser}></Sidebar>
      <Switch>
        <Route path="/" exact>
          <Chat 
            user={localUser}
          />
        </Route>
        <Route path="/messages/:conversation_id" render={(props) => <Conversation {...props} currentUser={localUser} />} />
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
