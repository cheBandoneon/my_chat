import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute ({component: Component, isLogin, ...rest}) {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page

    isLogin  
      ?
      <Route {...rest} render={props => (<Component {...props} />)} />
      : 
      <Redirect to="/login" />
  )
}

export default PrivateRoute;