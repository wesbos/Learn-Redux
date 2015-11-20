import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

/*
  Action Creators
  
  These fire events which the reducer will handle
  We will later call these functions from inside our component 

  Later these functions get bound to 'dispatch' fires the actual event
  Right now they just return an object

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const ADD_HEART = 'ADD_HEART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

function heart(dogNo) {
  return {
    type : ADD_HEART,
    dogNo : dogNo
  };
}

function addItem(text) {
  return {
    type : ADD_ITEM,
    text
  };
}

var actionCreators = {increment, decrement, heart, addItem};

/*
  Reducers
  reducers match up the fired action with a function that should be called.
  It will take in a copy of state, modify it, and return the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state
  
  The name of the reducer must line up with the name in state

*/

function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}

function dogs(state = [], action) {
  switch (action.type) {
    case ADD_HEART:
      var newState = state.slice(); // make a copy because we shouldn't mutate the state directly
      newState[action.dogNo].hearts++;
      return newState;
    default:
      return state;
  }
}

function items(state = [], action) {
  switch (action.type) {
    case ADD_ITEM :
      var newState = state.slice();
      newState.push(action.text);
      return newState;  
    case REMOVE_ITEM :
      return state;
    default:
      return state;
  }
}

// Combine all our reducers into a single file
const rootReducer = combineReducers({
  counter, dogs, items
});

/*
  Store

  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - here I'm setting the counter to 100 on load
*/

let defaultState = {
  counter : 100,
  dogs : [{name : 'snickers', hearts : 0}, {name : 'Hugo', hearts : 0}, {name :'Prudence', hearts : 0}],
  items : ['milk','eggs','bread']
};

const store = createStore(rootReducer, defaultState);

/*
  Components

  This is where the actual interface / view comes into play
*/

var Counter = React.createClass({
  displayName : 'Counter',
  render() {
    // This line uses ES6 destructuring to make shorter variables. Better than using this.props.increment etc...

    const { increment, decrement, heart, counter, dogs } = this.props;

    // Then we go ahead and return some JSX
    return (
      <div>
        <p>
          Clicked: {counter} times
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
          <button onClick={heart.bind(null,1)}>Add a heart to hugo</button>
        </p>
        {dogs.map((dog,i) => <Dog heart={heart} key={i} i={i} dog={dog} />)}

        <ShoppingList {...this.props} />
      </div>
    );
  }
});


var Dog = React.createClass({
  displayName : 'Dog',
  render() {
    let dog = this.props.dog;
    return (
      <div>
         <h2>{dog.name}</h2>
        <button onClick={this.props.heart.bind(null,this.props.i)}>{dog.hearts}</button>
      </div>
    );
  }
});

var ShoppingList = React.createClass({
  displayName : 'ShoppingList',
  handleSubmit(e) {
    e.preventDefault();
    this.props.addItem(this.refs.item.value);
  },
  render() {
    return (
      <div>
        t
        {this.props.items.map((item,i) => <p key={i}>{item}</p>)}
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="item"/>
          <input type="submit"/>
        </form>
      </div>
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
    counter: state.counter,
    dogs : state.dogs,
    items : state.items
  };
}


/* This will make the bind our actions to dispatch (make the fire-able) and */
function mapDispatchToProps(dispatch) {
  // Here we are providing and object of all the actions that need to be made available via props
  // We have three: increment, and decrement and heart
  return bindActionCreators(actionCreators, dispatch);
  /* Note: bindActionCreators will alos make these actions available to all children */
}

// We create an <App/> component which is just our <Counter/> component with it's props
// populated with our functions (increment & decrement) and our state (counter)

var App = connect(mapStateToProps, mapDispatchToProps)(Counter);

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
