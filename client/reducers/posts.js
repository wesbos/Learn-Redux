function posts(state = [], action) {
  switch (action.type) {
    /*TODO: Is this an anti-pattern? https://github.com/coodoo/react-redux-isomorphic-example/issues/9 */
    case 'LOAD' :
      var posts = action.posts.slice();
      return posts;
    case 'INCREMENT_LIKES' :
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
