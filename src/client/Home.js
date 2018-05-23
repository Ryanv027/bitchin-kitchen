import React from 'react';
import { Navigation } from './components/Navigation'
import { Userstatus } from './components/Userstatus'
import { Search } from './components/Search'
import { Logo } from './components/Logo'
import { Newnav } from './components/Newnav'
import './new.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
    };
  }

  getInitialState() {
    return { searchTerm: "", searchUrl: "" };
  }

  handleKeyUp(e) {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey;
      this.setState({ searchUrl: searchUrl });
    }
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div>


        <Newnav />




        <div className="container">
          <div className="row mt-2">
            <div className="col-2"></div>
            <div className="col-8">

              <h1 className="text-center">Welcome to Bitchin Kitchen</h1>
              <h3 className="text-center">Making Your Meal Prep Easy!</h3>


            </div>
            <div className="col-2"></div>
          </div>
          <div className="row mt-2">
            <div className="col-3"></div>
            <div className="col-6">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">Find New Recipes</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Organize Your Meals</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Create Your Own Recipes</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Save Your Recipes for Later</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Plan Your Meals for the Week</li>

              </ul>
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row mt-2">
            <div className="col-3"></div>
            <div className="col-6 text-center">
              <button type="button" className="btn btn-danger btn-lg mx-1">Join Today!</button>
              <button type="button" className="btn btn-info btn-lg mx-1">Log In</button>
            </div>
            <div className="col-3"></div>
          </div>

        </div>

        <footer className="footer">
          <div className="row m-0">
            <div className="col-12 pt-3">
              <p className="text-center">
                Created by Brian, Kyle, Robert and Ryan in 2018
              </p>
            </div>
          </div>
        </footer>


      </div>
    )
  }
}

