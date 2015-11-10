import React from 'react';
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux';

/*
  Actions
  
  These fire events which the reducer will handle
  We will later call these functions from inside our component 

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/

const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

function increment() {
  console.log('sending an increment action');
  return {
    type: INCREMENT_COUNTER
  }
}

function decrement() {
  console.log('sending an decrement action');
  return {
    type: DECREMENT_COUNTER
  }
}

/*
  Reducers

  take in a copy of state, modify it, and return the new state
*/

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}

// Combine all our reducers into a single file
const rootReducer = combineReducers({
  counter
});

/*
  Store

  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - here I'm setting the counter to 100 on load
*/

const store = createStore(rootReducer, { counter : 100 });

/*
  Components

  This is where the actual interface / view comes into play
*/

var Counter = React.createClass({
  displayName : 'mycounter',
  render() {
    // This line uses ES6 destructuring to make shorter variables. Better than using this.props.increment etc...

    const { increment, decrement, counter } = this.props

    // Then we go ahead and return some JSX
    return (
      <p>
        Clicked: {counter} times
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </p>
    )
  }
});

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
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  // Here we are providing and object of all the actions that need to be made available via props
  // We have two: increment, and decrement
  return bindActionCreators({increment, decrement }, dispatch)
}

// We create an <App/> component which is just our <Counter/> component with it's props
// populated with our functions (increment & decrement) and our state (counter)

var App = connect(mapStateToProps, mapDispatchToProps)(Counter)

/*
  Rendering
  
  This is where we hook up the Store with our actual component 

*/
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
