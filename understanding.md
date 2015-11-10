## Store
We have a single store that holds all of our data

## Actions

You have Actions which are functions that will tell redux to update data. It takes in the currentState and the action. Once it's done changing, it will return the updated state.

## Reducers

We have a reducer that will handle the actual updating of state

https://github.com/anorudes/redux-easy-boilerplate/blob/master/src/actions/items.js

You can combine multiple reducers into one 'root reducer' with `combineReducers()`

## Subscribing

Components can subscribe to redux state.

## Provider
The Provider is used to expose the Redux instance to the component and it's children.

