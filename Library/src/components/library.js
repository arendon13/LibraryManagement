import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Library extends Component{
  componentWillMount(){
    this.props.fetchItems();
  }

  renderItems(){
    return _.map(this.props.items, item => {
      const itemContent = `${item.ItemID}: ${item.ItemName} (${item.ItemType}) - ${item.AdditionalInfo}`

      return(
        <p key={item.ItemID}>{itemContent}</p>
      );
    });
  }

  render(){
    return(
      <div className="container">
        {this.renderItems()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { items: state.fetch.items };
}

export default connect(mapStateToProps, actions)(Library);
