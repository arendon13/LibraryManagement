import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as fetchActions from '../actions/fetch';


class EditItem extends Component{
  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.actions.fetchActions.fetchItem(id);
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
          {...field.input}/>
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
    console.log('Submit');
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <div className="container container-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="form-group">
            <label>Type:</label>
            <div>
              <Field name="ItemType" component="select">
                {this.itemTypeOptions()}
              </Field>
            </div>
          </div>
          <Field
            label="Name:"
            name="ItemName"
            value="Test"
            component={this.renderFieldValidate}
            type="text"/>
          <Field
            label="Additional Info (Optional):"
            name="AdditionalInfo"
            component={this.renderField}
            type="text"/>
          <div className="form-group"><button type="submit" className="btn btn-outline-success">Edit Item</button></div>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.ItemName){
    errors.ItemName = 'Please enter a name for this item.';
  } else if(values.ItemName.length < 4){
    errors.ItemName = 'The name must be greater than 3 characters.';
  }
  return errors;
}

function mapStateToProps(state){
  return{
    initialValues: state.fetch.item,
    itemTypes: state.fetch.itemTypes
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: {
      fetchActions: bindActionCreators(fetchActions, dispatch)
    }
  }
}

const reduxFormEditItem = reduxForm({
  validate,
  form: 'editItem',
  enableReinitialize : true
})(EditItem);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormEditItem);
