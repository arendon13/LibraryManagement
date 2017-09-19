import _ from 'lodash';
import { FETCH_ITEMS, FETCH_ITEM_TYPES } from '../actions/types';

export default function(state = {}, action){
  switch (action.type) {
    case FETCH_ITEMS:
      let { result } = action.payload;
      let items = _.mapKeys(result, function(value, key){
        return result[key].ItemID;
      });

      return { ...state, items };
    case FETCH_ITEM_TYPES:
      result = action.payload.result;
      let itemTypes = _.mapKeys(result, function(value, key){
        return result[key].ItemTypeID;
      });
      
      return { ...state, itemTypes };
    default:
      return state;
  }
}