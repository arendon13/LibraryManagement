import axios from 'axios';
import { POST_ERROR } from './types';

const ROOT_URL = 'http://localhost:3030';

export function addItem(values, history){
  console.log(values);
  return function(dispatch){
    axios.post(`${ROOT_URL}/addItem`, values)
      .then(response => {
        history.push('/library');
      })
      .catch(({response}) => {
        if(!response.data.error){
          dispatch(postError(response.data));
        } else{
          dispatch(postError(response.data.error));
        }

      });
  }
}

export function postError(error){
  return{
    type: POST_ERROR,
    payload: error
  }
}
