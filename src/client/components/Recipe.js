import React from 'react';
import ReactStars from 'react-stars'

export default class Recipe extends React.Component {
    render(){
        let list = this.props.recipes.map((recipe) => {
            console.log(recipe);
            return (
                <div className='recipeHolder col-md-4 col-12'
                key={Math.random()} >
                    <div
                    className='recipes card'
                    >
                        <span 
                            className={`favHolder ${this.props.favorites.indexOf(recipe.id) !== -1 ? 'selected' : 'fav'}`}
                            onClick={(e) => {
                            this.props.handleStar(recipe.id, recipe.recipeName, recipe.smallImageUrls)
                            }}>
                            ★</span>
                        <img 
                            src={recipe.smallImageUrls} 
                            alt={recipe.recipeName} 
                            height={100}
                            width={120}
                            className="card-img-top recipeImage"
                            />
                        <h4
                        className='card-title'
                        onClick={(e) => {
                            this.props.handleRecipe(recipe.id)
                        }}
                        >{recipe.recipeName}
                        </h4>
                        <div className="card-body">
                            <div className="card-text">
                                <span className="recipeSource text-center">
                                    {`Rating: ${recipe.rating}`}
                                </span>
                            </div>
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