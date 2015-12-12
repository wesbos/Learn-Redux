import { createStore, combineReducers } from 'redux';

// Import some dummy data - this could come from an API
import photos from './data/photos';
import allComments from './data/comments';
import rootReducer from './reducers/index';
/*
  Store

  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - here I'm setting the counter to 100 on load
  
*/
let defaultState = {
  posts : photos,
  comments : allComments
};

// Load in the devtools, but only on the client side
// const store = (typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, defaultState);

const store = createStore(rootReducer, defaultState);

/* Hot Reload Bling */
if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
