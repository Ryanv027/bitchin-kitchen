import React from 'react';

export class Navigation extends React.Component {
  render() {
    return (
      <div id="navigation" className="col-4">
        <nav class="nav">
          <a class="nav-link active" href="#">Home</a>
          <a class="nav-link " href="#">Account</a>
          <a class="nav-link " href="#">Recipes</a>
          <a class="nav-link " href="#">Create</a>
        </nav>
      </div>
    );
  }
}