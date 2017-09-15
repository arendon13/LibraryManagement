import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddItem extends Component{
  componentWillMount(){
    this.props.fetchItemTypes();
  }

  render(){
    console.log(this.props.itemTypes);
    return(
      <div className="container">
        <p>Add Item Component</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { itemTypes: state.fetch.itemTypes };
}

export default connect(mapStateToProps, actions)(AddItem);
