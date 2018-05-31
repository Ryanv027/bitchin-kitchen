import React from 'react';
import ReactStars from 'react-stars'

export default class Recipe extends React.Component {
    render(){
        let list = this.props.recipes.map((recipe) => {
            return (
                <div className='recipeHolder col-md-4 col-12'
                key={Math.random()} >
                    <div
                    className='recipes'
                    >
                        <h1
                        className='recipeHeader text-center'
                        onClick={(e) => {
                            this.props.handleRecipe(recipe.id)
                        }}
                        >{recipe.recipeName}
                        </h1>
                        <div className="row">
                            <img 
                            src={recipe.smallImageUrls} 
                            alt={recipe.recipeName} 
                            height={100}
                            width={120}
                            className="recipeImage col-6"
                            />
                            <p className="recipeSource text-center col-3">
                            
                            {`Rating: ${recipe.rating}`}
                            </p>
                            <p 
                                className={`col-3 favHolder ${this.props.favorites.indexOf(recipe.id) !== -1 ? 'selected' : 'fav'}`}
                                onClick={(e) => {
                                this.props.handleStar(recipe.id)
                            }}>
                            ★</p>
                        </div>
                    </div> 
                </div>
            )
        })
        return (
            <div className="row"> 
                {this.props.recipes.length > 0 && list}
            </div>
        )
    }
}