import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute ({component: Component, isLogin, ...rest}) {
  console.log('Authenticate:'+isLogin);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      isLogin 
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
}

export default PrivateRoute;