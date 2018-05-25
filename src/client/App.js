import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      welcome: null, 
      username: '',
      user: null
    };
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {Home}/>
          {/* <Route exact path = '/about' component = {About}/> */}
        </Switch>
      </HashRouter>
    );
  }
}
