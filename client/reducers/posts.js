function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER' :
      var newState = state.slice();
      newState[action.index].likes++;
      return newState;
    case 'ADD_ITEM' :
      var newState = state.slice();
      newState.push(action.text);
      return newState;  
    case 'REMOVE_ITEM' :
      return state;
    default:
      return state;
  }
}

export default posts;
