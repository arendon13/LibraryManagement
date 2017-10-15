import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class SignOut extends Component{
  componentWillMount(){
    this.props.signout();
  }

  render(){
    return(
      <div className="container">
        You have successfully signed out!
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);
