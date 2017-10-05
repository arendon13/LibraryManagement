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
import AddItemTypes from './containers/add_item_types';
import EditItem from './containers/edit_item';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
          <Route path="/library/itemView/:id" component={ViewItem}/>
          <Route path="/library/editItem/:id" component={EditItem}/>
          <Route path="/library/addItemTypes" component={AddItemTypes}/>
          <Route path="/library/addItem" component={AddItem}/>
          <Route path="/library" component={Library}/>
          <Route exact path="/" component={Welcome}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#application'));
