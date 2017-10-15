import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';
import FormAlert from '../form_alert';
import { connect } from 'react-redux';

class SignIn extends Component{
  handleFormSubmit = (values) => {
    // console.log(values);
    this.props.signin(values, this.props.history);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <FormAlert errorMessage={this.props.errorMessage} />
      );
    }
  }

  render(){
    const { handleSubmit } = this.props

    return(
      <div className="container container-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="form-group">
            <label>Email:</label>
            <Field name="email" component="input" type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <Field name="password" component="input" type="password" className="form-control" />
          </div>
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

const reduxFormSignIn = reduxForm({
  form: 'signin'
})(SignIn);

export default connect(mapStateToProps, actions)(reduxFormSignIn);
