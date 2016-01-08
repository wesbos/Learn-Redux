import { createStore, combineReducers } from 'redux';

// Import some dummy data - this could come from an API
import rootReducer from './reducers/index';

/*
  Store

  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - similar to React's getInitialState
*/

const defaultState = {
  posts : [],
  comments : {}
};

/*
  Create our store which will hold all of our data.
  Normally this would look like this:

    const store = createStore(rootReducer, defaultState);

  But we are using the redux dev tools chrome extension so it requires a little more setup. 
*/

/* TODO Only do this in DEVELOPMENT */

const store = (typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, defaultState);

/*
  Enable Hot Reloading for the reducers
  We re-require() the reducers whenever any new code has been written.
  Webpack will handle the rest
*/

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
