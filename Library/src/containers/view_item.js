import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemLogsTable from '../components/item_logs_table';
import * as actions from '../actions/fetch';

class ViewItem extends Component{
  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.fetchItemLogs(id);
  }

  render(){
    // TODO: Take into account when the item is already checked out and button should not be present
    if(!this.props.item) { return <div>Loading...</div>}
    return(
      <div className="container">
        <p className="top-space">
            Item ID: <strong>{this.props.item.ItemID}</strong><br/>
            Item Name: <strong>{this.props.item.ItemName}</strong>
        </p>
        <div className="btns-space">
          <span className="btnSpace"><Link className="btn btn-outline-info" to="/library">Back to Library</Link></span>
          <span className="btnSpace"><Link className="btn btn-outline-warning" to={`/library/checkOut/${this.props.item.ItemID}`}>Check Out</Link></span>
        </div>
        <div>
          <ItemLogsTable logs={this.props.itemLogs}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    item: state.fetch.item,
    itemLogs: state.fetch.itemLogs
  };
}

export default connect(mapStateToProps, actions)(ViewItem);
