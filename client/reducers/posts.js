function posts(state = [], action) {
  switch (action.type) {
    case 'LOAD' :
      return [...action.posts];
    case 'INCREMENT_LIKES' :
      var i = action.index;
      return [
        ...state.slice(0, i),
        {...state[i],  likes: state[i].likes + 1 },
        ...state.slice(i + 1)
      ];
    default:
      return state;
  }
}

export default posts;
