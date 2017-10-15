import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import fetchReducer from './fetch_reducer';
import postReducer from './post_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form,
  fetch: fetchReducer,
  post: postReducer,
  auth: authReducer
});

export default rootReducer;
