import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import firebase, { auth, provider } from './firebase.js';
import firebaseui from 'firebaseui';
import 'firebase/auth';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      welcome: null, 
      username: '',
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route 
          exact path = '/'
          render={(routeProps) => (<Home {...routeProps} 
            user={this.state.user}
            onClickLogin={this.login = this.login.bind(this)}
            onClickLogout={this.logout = this.logout.bind(this)}
             />
          )}
          />
          {/* <Route exact path = '/about' component = {About}/> */}
        </Switch>
      </HashRouter>
    );
  }
}
