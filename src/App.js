import React, { useState, useEffect }   from 'react';
import { Route, Switch }                from "react-router-dom";
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

  const { user, isAuthenticated, isLoading  } = useAuth0();
  const [ localUser, setLocalUser ] = useState('');

  useEffect( () => {
    if( isAuthenticated ) {
      getSingleUser();
      return () => false
    }
  }, [isAuthenticated]);

  const getSingleUser = async () => {
    setLocalUser( await fetchUserByEmail(user.email) );
  };
  
  return (
    isLoading || ! localUser 
    ?
      <Loading />
    :
    <div className="App">
      <Sidebar user={localUser}></Sidebar>
      <Switch>
        <PrivateRoute 
          path="/" 
          isLogin={isAuthenticated} 
          exact 
        >
          <h1>My chat</h1>
        </PrivateRoute>
        <PrivateRoute 
          path="/messages/:conversation_id"
          isLogin={isAuthenticated}
          component={(props) =><Chat {...props} currentUser={localUser} />} 
        />
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  )  
}

export default App;
