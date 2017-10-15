import axios from 'axios';
import { POST_ERROR } from './types';

const ROOT_URL = 'http://localhost:3030';

export function addItem(values, history){
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

export function addItemType(values, history){
  return function(dispatch){
    axios.post(`${ROOT_URL}/addItemType`, values)
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

export function editItem(values, id, history){
  return function(dispatch){
    axios.post(`${ROOT_URL}/editItem/${id}`, values)
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

export function checkOut(values, id, history){
  return function(dispatch){
    axios.post(`${ROOT_URL}/checkOut/${id}`, values)
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

export function returnItem(id, history){
  return function(dispatch){
    let url = `${ROOT_URL}/return/${id}`;
    axios.post(url)
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
