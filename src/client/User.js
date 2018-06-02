import React from 'react';
import RecipeScroller from './components/RecipeScroller'
import { Newnav } from './components/Newnav'
import { Search } from './components/Search'

export default class User extends React.Component {
    constructor(props){
        super(props)
        
    }
    render(){
        //console.log( 'User recipeQuery: ', this.props.recipeQuery);
        return (
            <div>
                <Newnav 
                   user={this.props.user}
                   onClickLogin={this.props.onClickLogin}
                   onClickLogout={this.props.onClickLogout}
                   searchTerm={this.props.searchTerm}
                   onChange={this.props.onChange}
                   onSubmit={this.props.onSubmit}
                />
                <RecipeScroller 
                recipeQuery={this.props.recipeQuery} 
                page={1} 
                handleStar={this.props.handleStar}
                favorites={this.props.favorites}
                />
            </div>
        )
    }
}