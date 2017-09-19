import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

function renderItems(items){
  return _.map(items, item => {
    const isAvailable = item.isAvailable === 1 ? 'Yes' : 'No';

    return(
      <tr key={item.ItemID}>
        <td scope="row">{item.ItemID}</td>
        <td>{item.ItemType}</td>
        <td>{item.ItemName}</td>
        <td>{item.AdditionalInfo}</td>
        <td>{isAvailable}</td>
        <td>
          <div className="btn-group" role="group" aria-label="Operations">
            <Link className="btn btn-outline-primary" to={`/library/itemView/${item.ItemID}`}>View</Link>
            <Link className="btn btn-outline-primary" to={`/library/editItem/${item.ItemID}`}>Edit</Link>
          </div>
        </td>
      </tr>
    );
  });
}

const LibraryTable = ({items}) => {
  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Name</th>
          <th>Additional Info</th>
          <th>Available</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {renderItems(items)}
      </tbody>
    </table>
  );
};


export default LibraryTable;
