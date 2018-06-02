import React from 'react';
export class Userstatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-4 p-0 user-wrapper">
        <div className="UserProfile">
          <div className="User">
            {this.props.user ?
              <div className="row">
                
                <div className="pt-2 ml-1">
                <button type="button" className="login btn btn-secondary btn-sm" onClick={this.props.onClickLogout}>Log Out</button>
                </div>
                <div className="image avatar"><img src={this.props.user.photoURL} /></div>
                <div className="name pt-3 uname"><p>{this.props.user.displayName || this.props.user.email}</p></div>
              </div>
              :
              <button type="button" className="btn btn-primary btn-sm" onClick={this.props.onClickLogin}>Log In</button>
              

            }
          </div>
        </div>
      </div>
    );
  }
};