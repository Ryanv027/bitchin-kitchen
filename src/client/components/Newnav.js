import React from 'react';
import { Logo } from './Logo'
import { Userstatus } from './Userstatus';

export class Newnav extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
        <Logo />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Recipes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Create</a>
            </li>
           
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search a recipe</button>
          </form>
          
        </div>
        <Userstatus />
      </nav>

    );
  }
}