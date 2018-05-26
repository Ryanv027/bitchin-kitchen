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
        selectedRecipe: false
        }
        this.paginationCall = this.paginationCall.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleRecipe = this.handleRecipe.bind(this);
    }
    componentWillMount(){
        
    }
    componentDidMount(){

        let url = `/api/recipe-search/${this.state.choice}/${this.state.page}`
        let recipes = []
        
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

    paginationCall() {
        let url = `/api/recipe-search/${this.state.choice}/${this.state.page}`
        let recipes = this.state.data
        fetch(url)
            .then(response => {
                return response.json(); 
            }).then(data => {
                for(let i =0; i < 10; i++){
                    recipes.push(data[i])
                }
                if(recipes.length > this.state.data.length -1){
                    this.setState(prevState => ({
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
    render(){
       return (
        <div>   
            <div
            className='row'
            >  
                <div className='scrollBox col-9 m-auto text-center'>
                    {this.state.data.length > 0 ? 
                        <Recipe recipes={this.state.data} 
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
