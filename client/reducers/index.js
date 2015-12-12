import { combineReducers } from 'redux';

/**
  Reducers
  reducers match up the fired action with a function that should be called.
  It will take in a copy of state, modify it, and return the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state
  
  The name of the reducer must line up with the name in state

*/

import posts from './posts';
import comments from './comments';

// Combine all our reducers togeher 
const rootReducer = combineReducers({ posts, comments });

export default rootReducer;
