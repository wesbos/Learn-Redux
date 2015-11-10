import React from 'react';
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux';

/*
  Actions
*/

const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

function decrement() {
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
*/

var Counter = React.createClass({
  displayName : 'mycounter',
  render() {
    // This line uses ES6 destructuring to make shorter variables. It's the same as doing:
    // var increment = this.props.increment;
    // var decrement = this.props.decrement;
    // var counter = this.props.counter;

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
  console.log(dispatch);
  // Here we are providing and object of all the actions that need to be made available via props
  // We have two: increment, and decrement
  return bindActionCreators({increment, decrement }, dispatch)
}

// We create an <App/> component which is our <Counter/> component connected
var App = connect(mapStateToProps, mapDispatchToProps)(Counter)


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
