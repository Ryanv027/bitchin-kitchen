import React from 'react';
import { Navigation } from './components/Navigation'
import { Userstatus } from './components/Userstatus'
import { Search } from './components/Search'
import { Logo } from './components/Logo'
import { Newnav } from './components/Newnav'
import './new.css';
import firebase, { auth, provider } from './firebase.js';
import firebaseui from 'firebaseui';
import 'firebase/auth';

export class Home extends React.Component {





  render() {
    return (
      <div>


        <Newnav
          user={this.props.user}
          onClickLogin={this.props.onClickLogin}
          onClickLogout={this.props.onClickLogout}
          searchTerm={this.props.searchTerm}
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit}
        />




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
              {this.props.user ?
                <div>
                  <button type="button" className="btn btn-danger btn-lg mx-1" onClick={this.props.onClickLogout}>Log Out</button>
                </div>
                :
                <div>
                  <button type="button" className="btn btn-info btn-lg mx-1" onClick={this.props.onClickLogin}>Log In</button>
                  <p className="text-danger">You have been logged out</p>
                </div>
              }
              <div id="firebaseui-auth-container"></div>
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

