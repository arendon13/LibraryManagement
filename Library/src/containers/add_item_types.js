import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurItemTypes from '../components/current_item_types';
import * as fetchActions from '../actions/fetch';
import * as postActions from '../actions/post';


class AddItemType extends Component{
  componentWillMount(){
    this.props.actions.fetchActions.fetchItemTypes();
  }

  renderField(field){
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label className="form-control-label">{field.label}</label>
        <input
          className="form-control"
          id="inputHorizontalDnger"
          type={field.type}
          {...field.input} />
        <div className="form-control-feedback">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  handleFormSubmit = (values) => {
    console.log('Submit!');
    this.props.actions.postActions.addItemType(values, this.props.history);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    console.log('Add Item Type', localStorage.getItem('token'));
    const {handleSubmit} = this.props;
    return(
      <div className="container container-form side-by-side">
        <CurItemTypes itemTypes={this.props.itemTypes}/>
        <div className="right-div">
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field
              label="Item Type Name:"
              name="itemType"
              component={this.renderField}
              type="text"/>
            {this.renderAlert()}
            <button type="submit" className="btn btn-outline-success">Add Item Type</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.itemType){
    errors.itemType = 'Please enter a name for this item type.';
  } else if(values.itemType.length < 3){
    errors.itemType = 'The item type name most be longer than 2 characters';
  }

  return errors;
}

function mapStateToProps(state){
  return{
    itemTypes: state.fetch.itemTypes,
    errorMessage: state.post.error
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: {
      fetchActions: bindActionCreators(fetchActions, dispatch),
      postActions: bindActionCreators(postActions, dispatch)
    }
  }
}

const reduxFormAddItemType = reduxForm({
  validate,
  form: 'addItemType'
})(AddItemType);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormAddItemType);
