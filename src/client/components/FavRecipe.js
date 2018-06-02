import React from 'react';

export class FavRecipe extends React.Component {
    render(){
        console.log(this.props.favdata[0])
        let list = this.props.favdata.map((recipe) => {
            return (
                <div className='recipes card'
                key={Math.random()} >
                        <span
                            className={`favHolder ${this.props.favorites.indexOf(recipe.recipe_id) !== -1 ? 'selected' : 'fav'}`}
                            onClick={(e) => {
                            this.props.handleStar(recipe.recipe_id)
                            this.props.getFavorites
                        }}>
                        ★</span>
                        <img 
                            src={recipe.image_url} 
                            alt={recipe.recipe_name} 
                            height={100}
                            width={120}
                            className="card-img-top recipeImage"
                            />
                        <h4
                        className='card-title'
                        onClick={(e) => {
                            this.props.handleRecipe(recipe.id)
                        }}
                        >{recipe.recipe_name}
                        </h4>
                        <div className="card-body">
                            <div className="card-text">
                            <p>
                                ingredients: who knows! But you sure do like them.
                            </p>
                            </div>
                        </div>
                    
                </div>
            )
        })
        return (
            <div className="card-deck"> 
                {this.props.favdata.length > 0 && list}
            </div>
        )
    }
}