import React from 'react';
import Modal from 'react-modal'; 

export default class RecipeModal extends React.Component {
    componentWillMount(){
        Modal.setAppElement('body');
    }
    componentWillReceiveProps(){
    }
    render(){
        let ingredients = []
        if(this.props.selectedRecipe){
            this.props.selectedRecipe.ingredientLines
                .map((indgredient) => {
                    ingredients.push(<li key={Math.random()}>{indgredient}</li>)
            })
        }

        return (
            <Modal
            isOpen={!!this.props.selectedRecipe}
            contentLabel='Recipe'
            onRequestClose={this.props.handleModal}
            >
                {this.props.selectedRecipe && ingredients.length > 1 &&
                    <div>
                        <h1>{this.props.selectedRecipe.name}</h1>
                        <br/>
                        <img src={this.props.selectedRecipe.images[0].hostedMediumUrl}/>
                        <hr/>
                        <h3>Ingredients</h3>
                        <br/>
                        <ul>
                            {ingredients}
                        </ul>
                        <p>Grab Directions: <a href={this.props.selectedRecipe.source.sourceRecipeUrl} target="_blank">Here!</a></p>
                    </div>
                }
                <button onClick={this.props.handleModal}>Exit</button>
            </Modal>
        )
    }
}