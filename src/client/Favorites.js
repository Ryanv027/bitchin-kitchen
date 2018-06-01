import React from 'react';
import { Newnav } from './components/Newnav'
import { FavRecipe } from './components/FavRecipe'
import { FavRecipeModal } from './components/FavRecipeModal'
import './new.css';
import { isError } from 'util';



export class Favorites extends React.Component {
  componentDidMount() {
    this.props.getUserFavorites()
    this.props.getFavorites()
}
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
          <div
            className='row'
            >  
            <div 
            className='scrollBox col-10 m-auto'
            id="scrollboxId"
            onScroll={this.props.handleScroll}
            >
              {this.props.favdata.length > 0 ? 
              <FavRecipe 
              favdata={this.props.favdata} 
              handleRecipe={this.props.handleRecipe}
              handleStar={this.props.handleStar}
              favorites={this.props.favorites}
              getFavorites={this.props.getFavorites}
              />
              : 
              <h1 className='text-center mt-5'>You need to go star some items first!</h1>} 
            </div>
         </div>
          <FavRecipeModal  
          selectedRecipe={this.props.selectedRecipe} 
          handleModal={this.props.handleModal}
          />
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

