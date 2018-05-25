import React from 'react';
import RecipeScroller from './components/RecipeScroller'
import { Newnav } from './components/Newnav'

export default class User extends React.Component {
    render(){
        return (
            <div>
                <Newnav />
                <RecipeScroller />
            </div>
        )
    }
}