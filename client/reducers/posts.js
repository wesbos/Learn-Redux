function posts(state = [], action) {
  console.log('Posts reducer called');
  switch (action.type) {
    case 'LOAD' :
      return [...action.posts];
    case 'INCREMENT_LIKES' :
      var i = action.index;
      return [
        ...state.slice(0, i),
        {...state[i],  likes: { count : state[i].likes.count + 1 }},
        ...state.slice(i + 1)
      ];
    default:
      return state;
  }
}

export default posts;
