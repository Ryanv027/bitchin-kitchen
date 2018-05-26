import React from 'react';

export default class Recipe extends React.Component {
    render(){
        console.log(this.props.recipes)
        let list = this.props.recipes.map((recipe) => {
            return (
                <div key={Math.random()} className='col-10 m-auto'>
                        <h1 onClick={(e) => {
                            this.props.handleRecipe(recipe.id)
                        }}
                        className='recipeHeader'
                        >{recipe.recipeName}</h1>
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
                {this.props.recipes.length > 0 && list}
            </div>
        )
    }
}