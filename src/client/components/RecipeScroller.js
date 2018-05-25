import React from 'react';
import ReactDOM from 'react-dom';
import Infinite from 'react-infinite';
import RecipeModal from './RecipeModal';

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
                    console.log(this.state.data)
                    console.log(this.state.choice)
                    console.log(this.state.page)
                }
            }).catch(error => {
                console.log(error)
        })
    }   

    paginationCall() {
        console.log(this.state.choice, this.state.page)
        let url = `/api/recipe-search/${this.state.choice}/${this.state.page}`
        let recipes = this.state.data
        fetch(url)
            .then(response => {
                return response.json(); 
            }).then(data => {
                for(let i =0; i < 10; i++){
                    recipes.push(data[i])
                }
                console.log(`pagination: ${recipes.length}`)
                console.log(this.state.data.length - 1)
                if(recipes.length > this.state.data.length -1){
                    console.log('hit')
                    this.setState(prevState => ({
                        data: recipes,
                        page: prevState.page + 1
                    }))
                    console.log(this.state.data)
                }
            }).catch(error => {
                console.log(error)
            }) 
    }
    handleRecipe(id){
        console.log(id)
        let url = `/api/get-recipe/${id}`
        fetch(url)
            .then(response => {
               return response.json();
            }).then(data => {
                this.setState(({ selectedRecipe: data }))
                console.log(this.state.selectedRecipe )
                
            }).catch(error => {
                console.log(error)
            })
    }
    handleModal(){
        this.setState(({ selectedRecipe: false }))
    }
    
    render(){
        console.log('rendering')
        let list = this.state.data.map((recipe) => {
            return (
                <div key={Math.random()}>
                        <h1 onClick={(e) => {
                            this.handleRecipe(recipe.id)
                        }}>{recipe.recipeName}</h1>
                        <img 
                        src={recipe.smallImageUrls} 
                        alt={recipe.recipeName} 
                        height={100}
                        width={100}
                        />
                </div> 
            )
        })
        
       return (
        <div>   
            <div
            className='row'
            >  
                <div className='scrollBox col-9 m-auto text-center'>
                    {this.state.data.length > 0 ? list : 'Loading Data...'}
                    {this.state.data.length > 0 && <button onClick={this.paginationCall}>More</button>} 
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

//need to set an auto reload on scroller
//need to give each recipe functionality by updating recipe componenet 