import React from 'react';

export default class Recipe extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div> 
        )
    }
}