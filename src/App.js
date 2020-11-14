import React, { useState, useEffect }   from 'react';
import { Route, Switch, Redirect }                from "react-router-dom";
import { useAuth0 }                     from '@auth0/auth0-react';
import Login                            from './_components/Login/Login.js';
import Chat                             from './_components/Chat/Chat';
import Sidebar                          from './_components/Sidebar/Sidebar';
import Loading                          from './_components/Loading/Loading';
import { fetchUserByEmail }             from './_services/userService';
import PrivateRoute                     from './_components/PrivateRoute/PrivateRoute';
import _                                from 'lodash';
import Pusher                           from 'pusher-js';
import './App.css';

function App() {

  /**
   * We will use 2 user instances in the App. 
   *  - For authentication, the Auth0 User. We will call him user.
   *  - For our App operations, a user in our server which is in sync with the Auth0 user. We will call him localUser.
   * 
   * We need both user instances to render the app.
   */
  const { user, isAuthenticated, isLoading }          = useAuth0();
  const [ localUser, setLocalUser ]                   = useState('');
  const [ hasTriedToAuthenticateUser, setHasTriedToAuthenticateUser]    = useState(false);
  const [ currentConversation, setCurrentConversation ] = useState();
  const [ pusher, setPusher] = useState('');
  const pusherKey = 'f7139a406e2944f4211f';

  /**
   * When the loading stops means that Auth0 finished it's request, so we can attempt to fetch a user from OUR server.
   * If we get a result means authentication was successful, otherwise we get an empty object
   */ 
  useEffect( () => {
    if( ! isLoading ) {
      fetchLocalUser();
      return () => false
    }
  }, [isLoading]);

  /**
   * When the localUser has changed in state, means that Auth0 has tried authenticating the user, and also we tried to get a user from our server.
   * So we set a flag in our state to mark that we tried to authenticate the user.
   */
  useEffect( () => {
    if( localUser ) { // Means we tried setting a user
      setHasTriedToAuthenticateUser(true);
      setPusher(new Pusher(pusherKey, { cluster: 'eu' }));

      return () => false
    }
  }, [localUser]);

  const fetchLocalUser = async () => {
    const email = user ? user.email : '';
    const localUser =  await fetchUserByEmail(email);
    setLocalUser( localUser );
  };
  
  return (
   ! hasTriedToAuthenticateUser
    ?
      <Loading />
    : // Render the app after we tried to authenticate the user.
      <div className="App">
        <Sidebar user={localUser} pusherKey={pusherKey}></Sidebar>
        <Switch>
          <PrivateRoute 
            path="/" 
            isLogin={isAuthenticated} 
            exact 
          >
            <h1>My chat</h1>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute 
            path="/messages/:conversation_id"
            isLogin={isAuthenticated}
            component={(props) =><Chat {...props} pusher={pusher} pusherKey={pusherKey} currentUser={localUser} />} 
          />
        </Switch>
      </div>
  )  
}

export default App;
