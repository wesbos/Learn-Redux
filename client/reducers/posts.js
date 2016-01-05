function posts(state = [], action) {
  switch (action.type) {
    case 'LOAD' :
      return [...action.posts];
    case 'INCREMENT_LIKES' :
      /* TODO: Make this deep clone - this is mutation and is will cause issues with time travel and testing. Make a note in the video on how slicing the top level array doesn't clone the objects inside of it */

      var newState = state.slice();
      newState[action.index].likes.count += 1;
      return newState;
    case 'ADD_ITEM' :
      return state.concat([action.text]);
    default:
      return state;
  }
}

export default posts;
