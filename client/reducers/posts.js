function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER' :
      var newState = state.slice();
      // Try and change this value to anything other than 10
      newState[action.index].likes += 10;
      return newState;
    case 'ADD_ITEM' :
      return state.concat([action.text]);
    case 'REMOVE_ITEM' :
      return state;
    default:
      return state;
  }
}

export default posts;
