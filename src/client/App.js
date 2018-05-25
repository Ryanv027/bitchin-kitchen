import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import User from './User';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { welcome: null };
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {Home}/>
          <Route path = '/user' component = {User}/>
        </Switch>
      </HashRouter>
    );
  }
}
