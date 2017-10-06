import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
// import ItemLogsTable from '../components/item_logs_table';
import * as fetchActions from '../actions/fetch';
import * as postActions from '../actions/post';

class ViewItem extends Component{
  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.actions.fetchActions.fetchItemLogs(id);
  }

  renderBtns(){
    if(this.props.item.isAvailable){
      return(
        <div>
          <span className="btnSpace"><Link className="btn btn-outline-info" to="/library">Back to Library</Link></span>
          <span className="btnSpace"><Link className="btn btn-outline-warning" to={`/library/checkOut/${this.props.item.ItemID}`}>Check Out</Link></span>
        </div>
      );
    } else{
      return(
        <div>
          <span className="btnSpace"><Link className="btn btn-outline-info" to="/library">Back to Library</Link></span>
        </div>
      );
    }
  }

  renderLogs(logs){
    if(_.isEmpty(logs)){
      return(
        <tr>
          <td colSpan="3">No Logs are available for this item yet. Lets hope this item gets checked out soon!</td>
        </tr>
      );
    } else{
      return _.map(logs, log => {
        if(!log.itemLog.DateReturned){
          return(
            <tr key={log.itemLog.ItemLogID}>
              <td>{log.itemLog.PersonFirstName} {log.itemLog.PersonLastName}</td>
              <td>{log.itemLog.DateBorrowed}</td>
              <td><button className="btn btn-outline-success" onClick={event => this.onReturnClick()}>Return</button></td>
            </tr>
          );
        } else{
          return(
            <tr key={log.itemLog.ItemLogID}>
              <td>{log.itemLog.PersonFirstName} {log.itemLog.PersonLastName}</td>
              <td>{log.itemLog.DateBorrowed}</td>
              <td>{log.itemLog.DateReturned}</td>
            </tr>
          );
        }
      });
    }
  }

  onReturnClick(){
    const {id} = this.props.match.params;
    this.props.actions.postActions.returnItem(id, this.props.history);
  }

  render(){
    if(!this.props.item) { return <div>Loading...</div>}
    return(
      <div className="container">
        <p className="top-space">
            Item ID: <strong>{this.props.item.ItemID}</strong><br/>
            Item Name: <strong>{this.props.item.ItemName}</strong>
        </p>
        <div className="btns-space">
          {this.renderBtns()}
        </div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Borrowed</th>
                <th>Date Returned</th>
              </tr>
            </thead>
            <tbody>
              {this.renderLogs(this.props.itemLogs)}
            </tbody>
          </table>
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

function mapDispatchToProps(dispatch){
  return{
    actions: {
      fetchActions: bindActionCreators(fetchActions, dispatch),
      postActions: bindActionCreators(postActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);
