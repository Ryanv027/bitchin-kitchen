import React from 'react';
import { Newnav } from './components/Newnav'
import { FavRecipe } from './components/FavRecipe'
import { FavRecipeModal } from './components/FavRecipeModal'
import './new.css';
import { isError } from 'util';



export class Favorites extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        chef: this.props.user.uid,
        data: [],    
        page: 1,
        choice: (this.props.recipeQuery) ? this.props.recipeQuery : 'sushi',
        selectedRecipe: false,
        searchTerm: '',
        recipeQuery: '',
    }
    console.log(this.props.recipeQuery);
    this.handleModal = this.handleModal.bind(this);
    this.handleRecipe = this.handleRecipe.bind(this);
}

componentWillReceiveProps(nextProps){
  if(nextProps.user !== this.props.user){
      this.setState({chef:nextProps.user.uid});
  }
}
componentDidMount(){
  this.getFavorites();
}

componentDidUpdate( prevProps, prevState, snapshot){
    if(prevProps.recipeQuery === this.props.recipeQuery) return;
    this.getFavorites();
}   
getFavorites( ){
  console.log('getFavorites in FAVORITES')
  fetch(`/api/getUserFavorites/${this.state.chef}`)
  .then(response => {
    return response.json();
  })
  .then(response => {
    this.setDataState(response)
  })
  .catch(error => {
    console.log(error)
  })
}
setDataState(recipes){
  let data = []
  for(let i =0; i < recipes.length; i++){
    data.push(recipes[i])
  }
  this.setState({ data })
}
handleRecipe(id){
    let url = `/api/get-recipe/${id}`
    fetch(url)
        .then(response => {
           return response.json();
        }).then(data => {
            this.setState(({ selectedRecipe: data }))                
        }).catch(error => {
            console.log(error)
        })
}
handleModal(){
    this.setState(({ selectedRecipe: false }))
}

handleSearch(event){

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
            onScroll={this.handleScroll}
            >
              {this.state.data.length > 0 ? 
              <FavRecipe 
              recipes={this.state.data} 
              handleRecipe={this.handleRecipe}
              handleStar={this.props.handleStar}
              favorites={this.props.favorites}
              getFavorites={this.getFavorites}
              />
              : 'Loading Data...'} 
            </div>
         </div>
          <FavRecipeModal  
          selectedRecipe={this.state.selectedRecipe} 
          handleModal={this.handleModal}
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

