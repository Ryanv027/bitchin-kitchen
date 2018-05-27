import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import User from './User';
import firebase, { auth, provider } from './firebase.js';
import * as firebaseui from 'firebaseui'
import 'firebase/auth';
import { apiRoutes } from '../../api/yummly.js';

var uiConfig = {
  signInSuccessUrl: '/user',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: null,
      username: '',
      user: null,
      searchTerm: ''
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // login() {
  //  ui.start('#firebaseui-auth-container', uiConfig)
  //      .then((result) => {
  //       const user = result.user;
  //       this.setState({
  //         user
  //       });
  //     });
  // }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleSubmit(event) {
    if (this.state.searchTerm !== '') {
      event.preventDefault()
      apiRoutes.pagination(this.searchTerm)
    }
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/user' component={User} />
          <Route
            exact path='/'
            render={(routeProps) => (<Home {...routeProps}
              user={this.state.user}
              searchTerm={this.state.searchTerm}
              onClickLogin={this.login = this.login.bind(this)}
              onClickLogout={this.logout = this.logout.bind(this)}
              onChange={this.handleChange = this.handleChange.bind(this)}
              onSubmit={this.handleSubmit = this.handleSubmit.bind(this)}
            />
            )}
          />
          {/* <Route exact path = '/about' component = {About}/> */}
        </Switch>
      </HashRouter>
    );
  }
}
