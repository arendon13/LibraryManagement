import axios from 'axios';
import { FETCH_ITEM, FETCH_ITEMS, FETCH_ITEM_TYPES } from './types';

const ROOT_URL = 'http://localhost:3030';

export function fetchItems(){
  return function(dispatch){
    axios.get(ROOT_URL)
      .then(response =>{
        dispatch({
          type: FETCH_ITEMS,
          payload: response.data
        });
      });
  }
}

export function fetchItemTypes(){
  return function(dispatch){
    let url = `${ROOT_URL}/ItemTypes`;
    axios.get(url)
      .then(response => {
        dispatch({
          type: FETCH_ITEM_TYPES,
          payload: response.data
        });
      });
  }
}

export function fetchItem(id){
  return function(dispatch){
    let url = `${ROOT_URL}/Item/${id}`;
    axios.get(url)
      .then(response => {
        dispatch({
          type: FETCH_ITEM,
          payload: response.data
        });
      });
  }
}
