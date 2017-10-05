import _ from 'lodash';
import { FETCH_ITEM, FETCH_ITEMS, FETCH_ITEM_TYPES, FETCH_ITEM_LOGS } from '../actions/types';

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
    case FETCH_ITEM:
      result = action.payload.result;
      return { ...state, item: result[0] };
    case FETCH_ITEM_LOGS:
      let itemResult = action.payload.result[0][0].item;
      let logsResult = action.payload.result[1];
      let logs = _.mapKeys(logsResult, function(value, key){
        return logsResult[key].itemLog.ItemLogID;
      });
      // console.log("In reducer:", logs);
      return { ...state, item: itemResult, itemLogs: logs };
    default:
      return state;
  }
}
