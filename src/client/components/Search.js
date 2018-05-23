import React from 'react';
export class Search extends React.Component {
    render() {
        return (
            <div className="col-4">
            <div id="search" className="Search">
                <input onKeyUp={this.props.handleKeyUp} onChange={this.props.handleChange} type="search" placeholder="Search for a recipe..." value={this.props.searchTerm} />
            </div>
            </div>
        )
    }
}