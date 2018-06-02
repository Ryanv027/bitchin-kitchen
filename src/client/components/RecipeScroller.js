import React from 'react';
import ReactDOM from 'react-dom';
import Infinite from 'react-infinite';
import RecipeModal from './RecipeModal';
import Recipe from './Recipe';

export default class RecipeScroller extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         data: [],    
    //         page: 1,
    //         choice: (this.props.recipeQuery) ? this.props.recipeQuery : 'pizza',
    //         selectedRecipe: false,
    //         startingPosition: 50,
    //         searchTerm: '',
    //         recipeQuery: '',
    //     }
    //     this.handleModal = this.handleModal.bind(this);
    //     this.handleRecipe = this.handleRecipe.bind(this);
    //     this.handleScroll = this.handleScroll.bind(this);
    //     this.scrollRecipes = this.scrollRecipes.bind(this);
    // }
    // componentWillMount(){
        
    // }
    // componentDidMount(){
    //     this.searchRecipes();
    //     this.props.getUserFavorites();
    // }
    componentDidUpdate( prevProps, prevState, snapshot){
        if(prevProps.recipeQuery === this.props.recipeQuery) {
            return false
        } else {
        this.setState({ page: 1, startingPosition: 50})
        this.props.searchRecipes();
        }
    }   
    // searchRecipes( ){
    //     //console.log('Search hit')
    //     let choice;
    //     if(this.props.recipeQuery){
    //          choice = this.props.recipeQuery;
    //          this.props.choice = this.props.recipeQuery;
    //     }else{
    //         choice = this.props.choice;
    //     }
    //     //console.log(choice)
    //     let url = `/api/recipe-search/${choice}/${this.state.page}`
    //     let recipes = []
    //     //console.log(url)
    //     fetch(url)
    //         .then(response => {
    //             return response.json();
    //         }).then(data => {
    //             console.log('data')
    //             for(let i = 0; i < 10; i++){
    //                 recipes.push(data[i])
    //             }
    //             if(recipes.length > 9){
    //                 this.setState( (prevState) => ({ 
    //                     data: recipes
    //                 }))
        
    //             }
    //         }).catch(error => {
    //             console.log(error)
    //     })
    // }
    // handleRecipe(id){
    //     let url = `/api/get-recipe/${id}`
    //     fetch(url)
    //         .then(response => {
    //            return response.json();
    //         }).then(data => {
    //             this.setState(({ selectedRecipe: data }))                
    //         }).catch(error => {
    //             console.log(error)
    //         })
    // }
    // handleModal(){
    //     this.setState(({ selectedRecipe: false }))
    // }
    // handleScroll(){
    //     const position = document.getElementById('scrollboxId').scrollTop
    //     console.log(`position:${position} startingPosition: ${(this.state.startingPosition)}`)
    //     if(position > (this.state.startingPosition)){
    //         this.setState((prevState) => ({ startingPosition: prevState.startingPosition + (400)}));
    //         this.scrollRecipes();
    //     }
    // }
    // scrollRecipes(){
    //     let url = `/api/recipe-search/${this.state.choice}/${this.state.page}`
    //         let currentRecipes = []
    //         fetch(url)
    //             .then(response => {
    //                 return response.json(); 
    //             }).then(data => {
    //                 for(let i =0; i < 10; i++){
    //                     if(data[i].recipeName !== undefined){
    //                     currentRecipes.push(data[i])
    //                     }
    //                 }
    //                 if(currentRecipes.length > 9){
    //                     this.setState(prevState => ({
    //                         data: prevState.data.concat(currentRecipes) ,
    //                         page: prevState.page + 1
    //                     }))
    //                 }
    //             }).catch(error => {
    //                 console.log(error)
    //             }) 
    // }
    render(){    
       return (
        <div>   
            <div
            className='row'
            >  
                <div 
                className='scrollBox col-10 m-auto'
                id="scrollboxId"
                onScroll={this.props.handleScroll}
                >
                    {this.props.data.length > 0 ? 
                        <Recipe 
                        recipes={this.props.data} 
                        handleRecipe={this.props.handleRecipe}
                        handleStar={this.props.handleStar}
                        favorites={this.props.favorites}
                        />
                        : 'Loading Data...'} 
                </div>
            </div>
            <RecipeModal 
            selectedRecipe={this.props.selectedRecipe} 
            handleModal={this.props.handleModal}
            />
        </div>
        )
    }
}