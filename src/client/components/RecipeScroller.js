import React from 'react';
import ReactDOM from 'react-dom';
import Infinite from 'react-infinite';
import RecipeModal from './RecipeModal';
import Recipe from './Recipe';

export default class RecipeScroller extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],    
            page: 1,
            choice: 'sushi',
            selectedRecipe: false,
            startingPosition: 780,
            searchTerm: '',
            recipeQuery: '',
        }
        console.log(this.props.recipeQuery);
        this.handleModal = this.handleModal.bind(this);
        this.handleRecipe = this.handleRecipe.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        this.searchRecipes()
    }
    componentDidUpdate( prevProps, prevState, snapshot){
        if(prevProps.recipeQuery === this.props.recipeQuery) return;
        this.searchRecipes();
    }   
    searchRecipes( ){
        console.log( 'yummly query: ', this.props.recipeQuery);
        let choice = (this.props.recipeQuery) ? this.props.recipeQuery : this.state.choice;
        // another case where you could have made things a litle more DRY
        console.log(choice);
        let url = `/api/recipe-search/${choice}/${this.state.page}`
        let recipes = []
        console.log(url);
        fetch(url)
            .then(response => {
                return response.json();
            }).then(data => {
                
                for(let i = 0; i < 10; i++){
                    recipes.push(data[i])
                }
                
                if(recipes.length > 9){
                    this.setState( (prevState) => ({ 
                        data: recipes,
                        page: prevState.page + 1 
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
    handleScroll(){
        // const position = document.getElementById('scrollboxId').scrollTop
        // console.log(`position:${position} startingPosition: ${(this.state.startingPosition)}`)
        // if(position > (this.state.startingPosition)){
        //     this.setState((prevState) => ({ startingPosition: prevState.startingPosition + (780 * 1.8)}));
        //     // @ryan this should have been more modular, there should have been a single call to api function that various
        //     // methods would then interact with. Basically this is all awesome, it just needs to be DRY
        //     let url = `/api/recipe-search/${this.state.choice}/${this.state.page}`
        //     let currentRecipes = []
        //     fetch(url)
        //         .then(response => {
        //             return response.json(); 
        //         }).then(data => {
        //             // console.log('recipe data: ', data)
        //             for(let i =0; i < 10; i++){
        //                 if(data[i].recipeName !== undefined){
        //                 currentRecipes.push(data[i])
        //                 }
        //             }
        //             // console.log(currentRecipes.length)
        //             if(currentRecipes.length > 9){
        //                 this.setState(prevState => ({
        //                     data: prevState.data.concat(currentRecipes) ,
        //                     page: prevState.page + 1
        //                 }))
        //             }
        //         }).catch(error => {
        //             console.log(error)
        //         }) 
        // }
    }
    handleSearch(event){

    }
    render(){    
       return (
        <div>   
            <div
            className='row'
            >  
                <div 
                className='scrollBox col-9 m-auto text-center'
                id="scrollboxId"
                // onScroll={this.handleScroll}
                >
                    {this.state.data.length > 0 ? 
                        <Recipe 
                        recipes={this.state.data} 
                        handleRecipe={this.handleRecipe}
                        paginationCall={this.paginationCall}
                        /> : 'Loading Data...'} 
                </div>
            </div>
            <RecipeModal 
            selectedRecipe={this.state.selectedRecipe} 
            handleModal={this.handleModal}
            />
        </div>
        )
    }
}