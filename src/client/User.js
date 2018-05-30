import React from 'react';
import RecipeScroller from './components/RecipeScroller'
import { Newnav } from './components/Newnav'
import { Search } from './components/Search'

export default class User extends React.Component {
    constructor(props){
        super(props)
        
    }
    render(){
        console.log( 'User recipeQuery: ', this.props.recipeQuery);
        return (
            <div>
                <Newnav 
                    user={this.props.user}
                    onChange={this.props.onChange}
                    searchTerm={this.props.searchTerm}
                    onSubmit={this.props.onSubmit}
                />

                
                <RecipeScroller recipeQuery={this.props.recipeQuery} page={1} />
            </div>
        )
    }
}