import React from 'react';

export class Navigation extends React.Component {
  render() {
    return (
      <div id="navigation" className="col-4">
        <nav className="nav">
          <a className="nav-link active" href="#">Home</a>
          <a className="nav-link " href="#">Account</a>
          <a className="nav-link " href="#">Recipes</a>
          <a className="nav-link " href="#">Create</a>
        </nav>
      </div>
    );
  }
}