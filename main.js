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
*/

const store = createStore(rootReducer);

/*
  Components
*/

var Counter = React.createClass({
  displayName : 'mycounter',
  render() {
    const { increment, decrement, counter } = this.props
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
  Containers
*/

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators(CounterActions, dispatch)
  return bindActionCreators({increment : increment, decrement : decrement }, dispatch)
}

var App = connect(mapStateToProps, mapDispatchToProps)(Counter)


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
