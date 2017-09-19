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

  render(){
    return(
      <div className="container">
        Edit Item Component
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  return errors;
}

function mapStateToProps(state){
  return{
    item: state.fetch.item,
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
  form: 'editItem'
})(EditItem);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormEditItem);
