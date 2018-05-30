import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { Create } from './Create';
import { Favorites } from './Favorites'
import User from './User';
import firebase, { auth, provider } from './firebase.js';
import * as firebaseui from 'firebaseui'
import 'firebase/auth';
import PrivateRoute from './PrivateRoute.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: null,
      username: '',
      user: null,
      searchTerm: '',
      recipeQuery: '',
      searchRedirect: false,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStar = this.handleStar.bind(this);
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
        window.location = '/#/user'
        this.setState({
          user
        });
      }).then;
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleSubmit(event) {
    console.log('fired', this.state.searchTerm);
    this.setState({ recipeQuery: this.state.searchTerm, searchRedirect: true });
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleStar(e) {
    console.log('hit')
    console.log(e)
  }

  render() {
    console.log(this.state.searchRedirect);
    return (
      <HashRouter>
        <Switch>
          {/* <PrivateRoute path='/user' component={User} /> */}
          <Route
          path='/user'
          render={(routeProps) => (<User {...routeProps}
            user={this.state.user}
            searchTerm={this.state.searchTerm}
            recipeQuery={this.state.recipeQuery}
            onClickLogin={this.login = this.login.bind(this)}
            onClickLogout={this.logout = this.logout.bind(this)}
            handleStar={this.handleStar}
            onChange={this.handleChange = this.handleChange.bind(this)}
            onSubmit={this.handleSubmit = this.handleSubmit.bind(this)}
          />
          )}  
          />

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


          <Route
            exact path='/create'
            render={(routeProps) => (<Create {...routeProps}
              user={this.state.user}
              searchTerm={this.state.searchTerm}
              onClickLogin={this.login = this.login.bind(this)}
              onClickLogout={this.logout = this.logout.bind(this)}
              onChange={this.handleChange = this.handleChange.bind(this)}
              onSubmit={this.handleSubmit = this.handleSubmit.bind(this)}
            />
            )}
          />

          <Route
            exact path='/favorites'
            render={(routeProps) => (<Favorites {...routeProps}
              user={this.state.user}
              searchTerm={this.state.searchTerm}
              onClickLogin={this.login = this.login.bind(this)}
              onClickLogout={this.logout = this.logout.bind(this)}
              onChange={this.handleChange = this.handleChange.bind(this)}
              onSubmit={this.handleSubmit = this.handleSubmit.bind(this)}
            />
            )}
          />


          {/* NOT SURE IF THIS IS CLOSE, REDIRECT NEEDS MAJOR WORK! */}
          <Route exact path='/' render={(routeProps) => (
            this.state.user ? (
              <Redirect from="/" to="/user"/>
            ) : (
              <Home {...routeProps}
              user={this.state.user}
              searchTerm={this.state.searchTerm}
              onClickLogin={this.login = this.login.bind(this)}
              onClickLogout={this.logout = this.logout.bind(this)}
              onChange={this.handleChange = this.handleChange.bind(this)}
              onSubmit={this.handleSubmit = this.handleSubmit.bind(this)}
            />
          )
          )}/>
          {/* END REDIRECT */}
          {/* <Route exact path = '/about' component = {About}/> */}
        </Switch>
      </HashRouter>
    );
  }
}
