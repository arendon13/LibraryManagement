import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Header from './components/header';
import Welcome from './components/welcome';
import Library from './containers/library';
import AddItem from './containers/add_item';
import ViewItem from './containers/view_item';
import CheckOut from './containers/check_out';
import AddItemTypes from './containers/add_item_types';
import EditItem from './containers/edit_item';
import SignOut from './components/auth/signout';
import SignIn from './components/auth/signin';
import requireAuth from './components/hoc/require_authentication';
import { AUTH_USER } from './actions/types';

// TODO: Edit index.js so it can use the HOC and keep track of a token

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token'); // If we have a token, consider the user signed in
if(token){
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route path="/library/checkOut/:id" component={requireAuth(CheckOut)}/>
          <Route path="/library/itemView/:id" component={requireAuth(ViewItem)}/>
          <Route path="/library/editItem/:id" component={requireAuth(EditItem)}/>
          <Route path="/library/addItemTypes" component={requireAuth(AddItemTypes)}/>
          <Route path="/library/addItem" component={requireAuth(AddItem)}/>
          <Route path="/library" component={Library}/>
          <Route path="/signout" component={SignOut}/>
          <Route path="/signin" component={SignIn}/>
          <Route exact path="/" component={Welcome}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#application'));
