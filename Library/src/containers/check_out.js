import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormAlert from '../components/form_alert';
import * as actions from '../actions/post';

class CheckOut extends Component{
  renderFieldValidate(field){
    const { meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label className="form-control-label">{field.label}</label>
        <input
          className="form-control"
          id="inputHorizontalDnger"
          {...field.input} />
        <div className="form-control-feedback">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <FormAlert errorMessage={this.props.errorMessage} />
      );
    }
  }

  handleFormSubmit = (values) => {
    console.log("Checking the item out!");
    const {id} = this.props.match.params;
    this.props.checkOut(values, id, this.props.history);
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <div className="container container-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field label="First Name:" name="PersonFirstName" component={this.renderFieldValidate} type="text"/>
          <Field label="Last Name:" name="PersonLastName" component={this.renderFieldValidate} type="text"/>
          {this.renderAlert()}
          <div className="form-group"><button type="submit" className="btn btn-outline-success">Check Out</button></div>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.PersonFirstName){
    errors.PersonFirstName = 'Please enter the first name for this person';
  } else if(values.PersonFirstName.length < 3){
    errors.PersonFirstName = 'The first name must be greater than 2 characters';
  }
  if(!values.PersonLastName){
    errors.PersonLastName = 'Please enter the last name for this person';
  } else if(values.PersonLastName.length < 2){
    errors.PersonLastName = 'The last name must be greater than 1 character';
  }

  return errors;
}

function mapStateToProps(state){
  return{
    errorMessage: state.post.error
  };
}

const reduxFormCheckOut = reduxForm({
  validate,
  form: 'checkOut'
})(CheckOut);

export default connect(mapStateToProps, actions)(reduxFormCheckOut);
