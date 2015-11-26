import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import photos from './photos';
import allComments from './comments';
import Login from './components/Login'

import * as actionCreators from './actions/actionCreators';

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
  comments : allComments,
};

const store = createStore(rootReducer, defaultState);

/*
  Components

  This is where the actual interface / view comes into play
*/

import Main from './components/Main';

/*
  Mapping

  We need a way to make
  1. our state (our data)
  2. our 'dispatch' functions 
  available to the <Counter /> component.

  We will surface state and functions via props (this.props.whatever)

*/

function mapStateToProps(state) {
  // Here we make state.counter available via `this.props.counter`
  return {
    posts: state.posts,
    comments : state.comments
  };
}


/* This will make the bind our actions to dispatch (make the fire-able) and */
function mapDispatchToProps(dispatch) {
  // Here we are providing and object of all the actions that need to be made available via props
  // We have three: increment, and decrement
  return bindActionCreators(actionCreators, dispatch);
  /* Note: bindActionCreators will alos make these actions available to all children */
}

// We create an <App/> component which is just our <Main/> component with it's props
// populated with our functions (increment & decrement) and our state (counter)

var App = connect(mapStateToProps, mapDispatchToProps)(Main);

/*
  Rendering
  This is where we hook up the Store with our actual component 
*/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
