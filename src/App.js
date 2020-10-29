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
import './App.css';

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ localUser, setLocalUser ] = useState('');
  const [ loginComplete, setLoginComplete] = useState(false);
  const PusherKey = 'f7139a406e2944f4211f';

  useEffect( () => {
    if( ! isLoading ) {
      getSingleUser();
      return () => false
    }
  }, [isLoading]);

  useEffect( () => {
    if( localUser ) { // Means we tried setting a user
      setLoginComplete(true);
      return () => false
    }
  }, [localUser]);

  const getSingleUser = async () => {
    const email = user ? user.email : '';
    setLocalUser( await fetchUserByEmail(email) );
  };
  
  return (
    ! loginComplete 
    ?
      <Loading />
    :
      <div className="App">
        <Sidebar user={localUser} pusherKey={PusherKey}></Sidebar>
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
            component={(props) =><Chat {...props} pusherKey={PusherKey} currentUser={localUser} />} 
          />
        </Switch>
      </div>
  )  
}

export default App;
