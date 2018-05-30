import React from 'react'

//one more note
//Crashes the site when object is loaded. 
// recipe ={
//     recipe-name: this.recipe-name,
//     ingredients: this.ingredients,
//     directions: this.directions, 
//     created-by: this.created-by,
//     image: this.img,
//     recipe-url: this.recipe-url,
// }

export default class Form extends React.Component {
    render (){
        return(
            <div class = "container">
            <div id="create-form">
                <form>
                <h3>Create a new recipe</h3>
                <br/>
                <div>
                Recipe Name<br/>
                <input type = "text" name= "recipe-name"/>
                </div>
                <div>
                Ingredients<br/>
                <textarea class="form-control" id="ingredients" rows="6"></textarea>
                </div>
                <div>
                Directions<br/>
                <textarea class="form-control" id="directions" rows="6"></textarea>
                </div>
                <div>
                Created by<br/>
                <input type = "text" name= "created-by"/>
                </div>
                <div>
                Image<br/>
                <input type="file" name="img"/>
                </div>
                <div>
                Recipe URL<br/>
                <input type="url" name="recipe-url"/>
                </div>
                <br/>
                <input type="submit" value="Submit"/>
                </form>
            </div>
            </div>
        );
    }
}