import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LibraryTable from '../components/library_table';
import * as actions from '../actions/fetch';

class Library extends Component{
  componentWillMount(){
    this.props.fetchItems();
  }

  render(){
    return(
      <div className="container">
        <div className="addItem">
          <Link className="btn btn-outline-info" to="/library/addItem">Add Item</Link>
        </div>
        <div>
          <LibraryTable items={this.props.items}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { items: state.fetch.items };
}

export default connect(mapStateToProps, actions)(Library);
