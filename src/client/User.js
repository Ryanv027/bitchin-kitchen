import React from 'react';
import RecipeScroller from './components/RecipeScroller'
import { Newnav } from './components/Newnav'
import { Search } from './components/Search'

export default class User extends React.Component {
    componentDidMount() {
        this.props.getUserFavorites()
        this.props.getFavorites()
    }
    render() {
        return (
            <div>
                <Newnav
                    user={this.props.user}
                    onChange={this.props.onChange}
                    searchTerm={this.props.searchTerm}
                    onSubmit={this.props.onSubmit}
                    onClickLogin={this.props.onClickLogin}
                    onClickLogout={this.props.onClickLogout}
                />
                <RecipeScroller
                    recipeQuery={this.props.recipeQuery}
                    data={this.props.data}
                    page={1}
                    handleStar={this.props.handleStar}
                    favorites={this.props.favorites}
                    getUserFavorites={this.props.getUserFavorites}
                    handleScroll={this.props.handleScroll}
                    handleRecipe={this.props.handleRecipe}
                    handleModal={this.props.handleModal}
                    selectedRecipe={this.props.selectedRecipe}
                    scrollRecipes={this.props.scrollRecipes}
                    searchRecipes={this.props.searchRecipes}
                />
            </div>
        )
    }
}