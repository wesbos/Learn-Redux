function comments(state = {}, action) {
  switch(action.type) {
    case 'ADD_COMMENT' : 
      var newState = Object.assign({},state);
      newState[action.postId] = newState[action.postId] || [];
      newState[action.postId].push({author : action.author, comment : action.comment});
      return newState;
    case 'REMOVE_COMMENT' : 
      // Take a copy of state
      var newState = Object.assign({},state);
      var comments = newState[action.postId];
      const i = action.i;
      newState[action.postId] = [...comments.slice(0,i), ...comments.slice(i+1)];
      return newState;
    default : 
      return state;
  }
}

export default comments;
