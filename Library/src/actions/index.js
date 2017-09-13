import axios from 'axios';
import { FETCH_ITEMS, FETCH_ITEM_TYPES } from './types';

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
