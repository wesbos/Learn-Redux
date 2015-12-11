import { createStore, combineReducers } from 'redux';

// Import some dummy data - this could come from an API
import photos from './data/photos';
import allComments from './data/comments';

/**
  Reducers
  reducers match up the fired action with a function that should be called.
  It will take in a copy of state, modify it, and return the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state
  
  The name of the reducer must line up with the name in state

*/

import posts from './reducers/posts';
import comments from './reducers/comments';

// Combine all our reducers togeher 
const rootReducer = combineReducers({ posts, comments });

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
const store = (typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, defaultState);

export default store;
