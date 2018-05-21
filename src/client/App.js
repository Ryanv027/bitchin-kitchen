import React, { Component } from 'react';
// import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { welcome: null };
  }

  componentDidMount() {
    console.log(this.state)
    fetch('/api/welcome')
      .then(res => res.json())
      .then(rroute => this.setState({ welcome: rroute.welcome }));
  }

  render() {
    return (
      <div>
        {this.state.welcome ? (
          <h1>Hello {this.state.welcome}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
