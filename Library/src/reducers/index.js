import { combineReducers } from 'redux';
import fetchReducer from './fetch_reducer';

const rootReducer = combineReducers({
  fetch: fetchReducer
});

export default rootReducer;
