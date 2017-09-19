import _ from 'lodash';
import React from 'react';

function renderItemTypes(itemTypes){
  return _.map(itemTypes, type => {
    return(
      <li key={type.ItemTypeID}>{type.ItemTypeName}</li>
    );
  });
}

const CurItemTypes = ({itemTypes}) =>{
  return(
    <div className="left-div">
      <h4>Current Item Types</h4>
      <ul>
        {renderItemTypes(itemTypes)}
      </ul>
    </div>
  );
}

export default CurItemTypes;
