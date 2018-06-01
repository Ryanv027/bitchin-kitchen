import React from 'react';

export class FavRecipe extends React.Component {
    render(){
        console.log(this.props.recipes[0])
        let list = this.props.recipes.map((recipe) => {
            console.log('WHAT THE FUCK')
            console.log(this.props.favorites)
            console.log(recipe.recipe_id)
            return (
                <div className='recipeHolder col-md-4 col-12'
                key={Math.random()} >
                    <div
                    className='recipes'
                    >
                        <h4
                        className='recipeHeader text-center'
                        onClick={(e) => {
                            this.props.handleRecipe(recipe.id)
                        }}
                        >{recipe.recipe_name}
                        </h4>
                        <div className="row">
                            <img 
                            src={recipe.image_url} 
                            alt={recipe.recipe_name} 
                            height={100}
                            width={120}
                            className="recipeImage col-6"
                            />
                            <p 
                            className={`col-3 favHolder ${this.props.favorites.indexOf(recipe.recipe_id) !== -1 ? 'selected' : 'fav'}`}
                            onClick={(e) => {
                            this.props.handleStar(recipe.recipe_id)
                            this.props.getFavorites
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