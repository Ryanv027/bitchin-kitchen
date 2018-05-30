import React from 'react'
import firebase, { auth, provider } from './firebase.js';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

//   Add your own authentication on the below line.
  let isLoggedIn = auth.currentUser


  console.log("Is Logged in:" + isLoggedIn)

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute