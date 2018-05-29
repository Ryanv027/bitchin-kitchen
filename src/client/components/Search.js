import React from 'react';
export class Search extends React.Component {

    render() {
        return (
            <div className="input-group mb-3">
                <input id="recipe-search" type="search" value={this.props.searchTerm} onChange={this.props.onChange} className="form-control" placeholder="Search Recipes" aria-label="Search Recipes" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button id="search-submit" onClick={this.props.onSubmit} className="btn btn-outline-secondary" type="submit">Go</button>
                </div>
            </div>
        )
    }
}