import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3030';

export function signin(values, history){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, values)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/library');
      })
      .catch(({response}) => {
        if(!response.data.error){
          dispatch(authError(response.data));
        } else{
          dispatch(authError(response.data.error));
        }
      });
  }
}

export function signout(){
  localStorage.removeItem('token');

  return{
    type: UNAUTH_USER
  };
}

export function authError(error){
  return{
    type: AUTH_ERROR,
    payload: error
  }
}
