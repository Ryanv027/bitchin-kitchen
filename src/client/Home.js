import React from 'react';
import { Navigation } from './components/Navigation'
import { Userstatus } from './components/Userstatus'
import { Search } from './components/Search'
import { Logo } from './components/Logo'
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

        <div className="container-fluid">
          <header>
            <div className="row my-2">
              <Logo />
              <Navigation />
              <Search />
              <Userstatus />
            </div>
          </header>
        </div>



        <div className="container">
          <div className="row mt-2">
            <div className="col-2"></div>
            <div className="col-8">
              <p className="text-center">
                <h1>Welcome to Bitchin Kitchen</h1>
                <h3>Making Your Meal Prep Easy!</h3>
              </p>
              <div className="col-1"></div>
              <div className="col-6">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">Find New Recipes</li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Organize Your Meals</li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Create Your Own Recipes</li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Save Your Recipes for Later</li>
                </ul>
              </div>
              <div className="col-1"></div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>


      </div>
    )
  }
}

