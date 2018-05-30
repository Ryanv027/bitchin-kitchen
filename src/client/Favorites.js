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
        chef: '',
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
    this.searchRecipes()
}
componentDidUpdate( prevProps, prevState, snapshot){
    if(prevProps.recipeQuery === this.props.recipeQuery) return;
    this.searchRecipes();
}   
searchRecipes( ){
    let url = `/api/favorites/${this.props.userid}`
    let recipes = []
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
    }
  })
        .then(response => {
          console.log(response)
            return response;
        }).then(data => {
            console.log('Data goes here:', data)
            for(let i = 0; i < 10; i++){
                recipes.push(data[i])
            }
            
            if(recipes.length > 9){
                this.setState( (prevState) => ({ 
                    data: recipes,
                    page: prevState.page + 1,
                    startingPosition: 50
                }))
    
            }
        }).catch(error => {
            console.log(error)
    })
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




        <div className="container">
          <div className="row mt-2">
            <div className="col-2"></div>
            <div className="col-8">

              <h1 className="text-center">Welcome to Bitchin Kitchen</h1>
              <h3 className="text-center">Making Your Meal Prep Easy!</h3>
              <h3 className="text-center">You can view your favorites here!</h3>
              <div>   
            <div
            className='row'
            >  
                <div 
                className='col-10 m-auto'
                >
                    {this.state.data.length > 0 ? 
                        <FavRecipe 
                        recipes={this.state.data} 
                        handleRecipe={this.handleRecipe}
                        handleStar={this.props.handleStar}
                        />
                        : 'Loading Data...'} 
                </div>
            </div>
            <FavRecipeModal  
            selectedRecipe={this.state.selectedRecipe} 
            handleModal={this.handleModal}
            />
        </div>
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

