function comments(state = {}, action) {
  switch(action.type) {

    case 'LOAD_COMMENTS' :
      // Take a copy of the current state
      var commentState = Object.assign({}, state);
      // Create a new property for this photo in the comments object 
      commentState[action.postId] = action.comments;
      // return our new state
      return commentState;
    
    case 'ADD_COMMENT' :
      // take a copy of state
      var commentState = Object.assign({},state);
      // push the comment into the new state
      commentState[action.postId].push({
        from : { full_name : action.author },
        text : action.comment
      });
      // return our new state
      return commentState;
    
    case 'REMOVE_COMMENT' : 
      console.log(action);
      // Take a copy of state
      var commentState = Object.assign({},state);
      var comments = commentState[action.postId];
      const i = action.i;
      /*TODO: Clean this up*/
      commentState[action.postId] = [...comments.slice(0,i), ...comments.slice(i+1)];
      return commentState;
    default : 
      return state;
  }
}

export default comments;
