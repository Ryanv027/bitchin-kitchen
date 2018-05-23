import React from 'react';
import myLogo from '../../images/logo.svg'

var logoStyle = {
    width: 80, 
    height: 80
}

export class Logo extends React.Component {
    render() {
		return (
			<div id="logo" className="col-2">
				<img src={myLogo} style={logoStyle} />
			</div>
		);
	}
};