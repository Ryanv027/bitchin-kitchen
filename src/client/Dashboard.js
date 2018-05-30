import React from 'react';
import { Newnav } from './components/Newnav'
import './new.css';
import Infinite from "react-infinite";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: null,
        };
    }

    getInitialState() {
        return { searchTerm: "", searchUrl: "" };
    }

    handleKeyUp(e) {
        if (e.key === 'Enter' && this.state.searchTerm !== '') {
            var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey;
            this.setState({ searchUrl: searchUrl });
        }
    }

    handleChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    render() {
        return (
            <div>


                <Newnav />




                <div className="container">
                    <div className="row mt-2">
                        <div className="col-2"></div>
                        <div className="col-8">

                            <h1 className="text-center">Dashboard Goes Here</h1>
                            <h3 className="text-center">Hey you fuck!</h3>

                            <Infinite containerHeight={200} elementHeight={40}>
                                <div className="one" />
                                <div className="two" />
                                <div className="three" />
                            </Infinite>

                        </div>
                        <div className="col-2"></div>
                    </div>

                    <footer className="footer">
                        <div className="row m-0">
                            <div className="col-12 pt-3">
                                <p className="text-center">
                                    Created by Brian, Kyle, Robert and Ryan in 2018
              </p>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>
        )
    }
}

