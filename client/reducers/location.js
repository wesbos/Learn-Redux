import { UPDATE_LOCATION } from 'redux-simple-router'

function location(state, action) {
  console.log("Location reducer called");
  switch(action.type) {
    case UPDATE_LOCATION:
      console.log('Update location called');
    default:
      return state;
  }
}

export default location;
