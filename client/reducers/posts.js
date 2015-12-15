function posts(state = [], action) {
  switch (action.type) {
    case 'LOAD' :
      console.log("loading in...");
      console.log(action.posts);
      return action.posts;
    case 'INCREMENT_COUNTER' :
      var newState = state.slice();
      newState[action.index].likes.count += 1;
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
