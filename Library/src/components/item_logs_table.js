import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

function renderLogs(logs){
  // TODO: Take into account when an item is already checked out and no DateReturned is available
  if(_.isEmpty(logs)){
    return(
      <tr>
        <td colSpan="3">No Logs are available for this item yet. Lets hope this item gets checked out soon!</td>
      </tr>
    );
  } else{
    return _.map(logs, log => {
      return(
        <tr key={log.itemLog.ItemLogID}>
          <td>{log.itemLog.PersonFirstName} {log.PersonLastName}</td>
          <td>{log.itemLog.DateBorrowed}</td>
          <td>{log.itemLog.DateReturned}</td>
        </tr>
      );
    });
  }
}

const ItemLogsTable = ({logs}) => {
  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Borrowed</th>
          <th>Date Returned</th>
        </tr>
      </thead>
      <tbody>
        {renderLogs(logs)}
      </tbody>
    </table>
  );
};

export default ItemLogsTable;
