import { cloneDeep } from 'lodash';

function posts(state = [], action) {
  switch (action.type) {
    case 'LOAD' :
      return [...action.posts];
    case 'INCREMENT_LIKES' :
      // Since the data that comes back from the Instagram API has likes 3 levels deep, we use Lodash cloneDeep to make sure we aren't mutating the state and making a true copy
      var newState = state.map((post) => cloneDeep(post));
      newState[action.index].likes.count += 1;
      return newState;
    default:
      return state;
  }
}

export default posts;
