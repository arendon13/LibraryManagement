import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import fetchReducer from './fetch_reducer';
import postReducer from './post_reducer';

const rootReducer = combineReducers({
  form,
  fetch: fetchReducer,
  post: postReducer
});

export default rootReducer;
