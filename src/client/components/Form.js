import React from 'react'

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chef: '',
            recipe_name: '',
            ingredients: '',
            image_url: '',
            recipe_url: '' 
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            chef: this.props.user.uid
        });
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault()
        let recipe_data = JSON.stringify(this.state)
        fetch('/api/create-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: recipe_data
        })
        this.setState({
            chef: '',
            recipe_name: '',
            ingredients: '',
            image_url: '',
            recipe_url: ''
            })
    };

    render (){
        return(
            <div className= "container">
            <div id="create-form">
                <form onSubmit={this.handleSubmit}>
                <h3>Create a new recipe</h3>
                <br/>
                <div>
                Recipe Name<br/>
                <input 
                type = "text" 
                name="recipe_name"
                value={this.state.recipe_name}
                onChange={this.handleInputChange} />
                </div>
                <div>
                Ingredients<br/>
                <textarea 
                className="form-control" 
                id="ingredients" 
                rows="6" 
                name="ingredients"
                value={this.state.ingredients}
                onChange={this.handleInputChange}></textarea>
                </div>
                <div>
                Image URL<br/>
                <input 
                type="url" 
                name="image_url"
                value={this.state.image_url} 
                onChange={this.handleInputChange} />
                </div>
                <div>
                Recipe URL<br/>
                <input 
                type="url" 
                name="recipe_url"
                value={this.state.recipe_url}
                onChange={this.handleInputChange} />
                </div>
                <br/>
                <input className= "btn btn-primary" type="submit" value="Submit"/>
                </form>
            </div>
            </div>
        );
    }
}