import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component{
  renderLinks(){
    if(this.props.authenticated){
      return[
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/library">Library</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ];
    } else{
      return[
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/library">Library</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
      ];
    }
  }

  render(){
    return(
      <nav className="navbar navbar-toggleable-md navbar-light header">
        <Link to="/" className="navbar-brand">Library Manager</Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return{
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);
