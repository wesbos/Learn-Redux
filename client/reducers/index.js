import { combineReducers } from 'redux';

/*
  Reducers

  Reducers match up the dispatched (fired) action with a function that should be called.
  
  It takes in a copy of state, modifies it, and returns the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state
  
*/

import posts from './posts';
import comments from './comments';
import { routeReducer } from 'redux-simple-router'; // we need this for react-router 

// Combine all our reducers togeher 
const rootReducer = combineReducers({ posts, comments, routing: routeReducer });

// Error logging
Raven.config('https://cb55d4f05cd443ce82303222f77ef5e0@app.getsentry.com/61499').install()

export default rootReducer;
