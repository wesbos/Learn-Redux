## Reduxstagram

## Fundamentals
Your state is one huge object - no matter how many components you have. 

You cannot modify state directly - instead you send off actions. The state is never modified directly - your reducer takes in state, and returns a new state. 

Explain: WTF does Immutable and Pure Functions mean?

Three Parts to it:

state = {
	The User
	The photos
}

# Keep asking until they hate me:

Where do the actions get triggerd?
Where does the state get modified?
Why can't we just push onto existing state?

1. First we are going to load in some existing state - how do we get the data from our store into our components

```js
let defaultState = {
  user : { username : 'wesbos', name : 'Wes Bos', bio : 'Wes is a cool guy' },
  photos : [...]
};

const store = createStore(rootReducer, defaultState);
```

Next we are going to work out how to update that data in our store 

ADD
DELETE 

EDIT Profile

1. Increment - Heart as many times as possible
2. Comments on a photo

Finally we are going to work out how to pull real data from an API and store it

3. Ajax in Data from the server


## Assumptions:
You already know React 
You know some ES6

## Stores
First start with some default state and get that showing
then we should use a reducer to work with and modify the state

## Actions

## Reducers

## File System Layout
require all actions in a single import

## Combining Reducers


## Simplifying Code - Using object literals directly

http://rackt.org/redux/docs/recipes/ReducingBoilerplate.html

## Maybe
Router for individual files?


## Redux Dev tools
## Hot loading


1. Setting up our environment
2. 
