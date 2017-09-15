import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fetchActions from '../actions/fetch';
import * as postActions from '../actions/post';

class AddItem extends Component{
  componentWillMount(){
    this.props.actions.fetchActions.fetchItemTypes();
  }

  renderFieldValidate(field){
    const { meta: {touched, error}} = field;
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

  renderField(field){
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input} />
      </div>
    );
  }

  itemTypeOptions(){
    return _.map(this.props.itemTypes, itemType => {
      return(
        <option value={itemType.ItemTypeName} key={itemType.ItemTypeID}>{itemType.ItemTypeName}</option>
      );
    });
  }

  handleFormSubmit = (values) => {
    this.props.actions.postActions.addItem(values, this.props.history);
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
    const { handleSubmit } = this.props;

    return(
      <div className="container">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="form-group">
            <label>Type:</label>
            <div>
              <Field name="itemType" component="select">
                {this.itemTypeOptions()}
              </Field>
            </div>
          </div>
          <Field
            label="Name:"
            name="itemName"
            component={this.renderFieldValidate}
            type="text"/>
          <Field
            label="Additional Info (Optional):"
            name="additionalInfo"
            component={this.renderField}
            type="text"/>
          {this.renderAlert()}
          <div className="form-group"><button type="submit" className="btn btn-outline-success">Add</button></div>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.itemName){
    errors.itemName = 'Please enter a name for this item.';
  } else if(values.itemName.length < 4){
    errors.itemName = 'The name must be greater than 3 characters.';
  }

  return errors;
}

function mapStateToProps(state){
  return {
    itemTypes: state.fetch.itemTypes,
    errorMessage: state.post.error
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: {
      fetchActions: bindActionCreators(fetchActions, dispatch),
      postActions: bindActionCreators(postActions, dispatch)
    }
  }
}

const reduxFormAddItem = reduxForm({
  validate,
  form: 'addItem'
})(AddItem);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormAddItem);
