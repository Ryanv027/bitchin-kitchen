import React from 'react';
import { Newnav } from './components/Newnav'
import './new.css';

export class Create extends React.Component {
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

                {/* Form Component Goes Here! */}

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
      </div>
    )
  }
}

