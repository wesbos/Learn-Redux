import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import photos from './photos';
import allComments from './comments';
import Login from './components/Login'

/*
  Action Creators
  
  These fire events which the reducer will handle
  We will later call these functions from inside our component 

  Later these functions get bound to 'dispatch' fires the actual event
  Right now they just return an object

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const ADD_COMMENT = 'ADD_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';


/* TODO: Figure out how to call these directly from the dispatcher */
function increment(i) {
  return {
    type: INCREMENT_COUNTER,
    index : i
  };
}

function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}


function addItem(text) {
  return {
    type : ADD_ITEM,
    text
  };
}

function addComment(postId, author, comment) {
  console.log("adding a comment");
  return {
    type : ADD_COMMENT,
    postId,
    author,
    comment
  };
}

function removeComment(postId, i){
  return {
    type : REMOVE_COMMENT,
    postId,
    i
  }
}

var actionCreators = {increment, decrement, addItem, addComment, removeComment};

/*
  Reducers
  reducers match up the fired action with a function that should be called.
  It will take in a copy of state, modify it, and return the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state
  
  The name of the reducer must line up with the name in state

*/

function user(state = {}, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}

function posts(state = [], action) {
  console.log(action);
  switch (action.type) {
    case INCREMENT_COUNTER :
      var newState = state.slice();
      newState[action.index].likes++;
      return newState;
    case ADD_ITEM :
      var newState = state.slice();
      newState.push(action.text);
      return newState;  
    case REMOVE_ITEM :
      return state;
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch(action.type) {
    case ADD_COMMENT : 
      var newState = Object.assign({},state);
      newState[action.postId] = newState[action.postId] || [];
      newState[action.postId].push({author : action.author, comment : action.comment});
      return newState;
    case REMOVE_COMMENT : 
      console.log("From the reducer!", action);
      return state;
    default : 
      return state;
  }
}

// Combine all our reducers into a single file
const rootReducer = combineReducers({
  user, posts, comments
});

/*
  Store

  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - here I'm setting the counter to 100 on load
*/

let defaultState = {
  user : { username : 'wesbos', name : 'Wes Bos', bio : 'Wes is a cool guy' },
  posts : photos,
  comments : allComments,
};

const store = createStore(rootReducer, defaultState);

/*
  Components

  This is where the actual interface / view comes into play
*/

var Main = React.createClass({
  displayName : 'Main',
  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <PhotoGrid {...this.props} />
      </div>
    );
  }
});


var PhotoGrid = React.createClass({
  displayName : 'PhotoGrid',
  handleSubmit(e) {
    e.preventDefault();
    this.props.addItem(this.refs.item.value);
  },
  componentDidMount() {
    
  },
  renderItem(post, i) {
    var { comments } = this.props;
    return (
      <figure key={i}>
        <img src={post.src} alt={post.caption}/>
        <figcaption>
          <p>{post.caption}</p>
          <button onClick={this.props.increment.bind(null,i)} className="likes">❤️{post.likes}</button>
        </figcaption>
        <Comments {...this.props} comments={comments[post.id]} postId={post.id} />
      </figure>
    );
  },
  render() {
    let { posts, increment } = this.props;
    return (
      <div className="PhotoGrid">
        {posts.map(this.renderItem)}
      </div>
    );
  }
});

const Comments = React.createClass({
  renderComment(data, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{data.author} : </strong>
          {data.comment}
          <button onClick={this.props.removeComment.bind(null,this.props.postId, i)}>&times;</button>
        </p>
      </div>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.addComment(this.props.postId, this.refs.author.value, this.refs.comment.value);
    this.refs.commentForm.reset();
  },
  render() {

    let { comments = [] } = this.props;

    return (
      <div className="comments">
        <div className="comment">
          {comments.map(this.renderComment)}
        </div>
        <form onSubmit={this.handleSubmit} ref="commentForm">
          <input type="text" ref="author" placeholder="author"/>
          <input type="text" ref="comment" placeholder="comment"/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
});

/*
  Mapping

  We need a way to make
  1. our state (our data)
  2. our 'dispatch' functions 
  available to the <Counter /> component.

  We will surface state and functions via props (this.props.whatever)

*/

function mapStateToProps(state) {
  // Here we make state.counter available via `this.props.counter`
  return {
    posts: state.posts,
    comments : state.comments
  };
}


/* This will make the bind our actions to dispatch (make the fire-able) and */
function mapDispatchToProps(dispatch) {
  // Here we are providing and object of all the actions that need to be made available via props
  // We have three: increment, and decrement
  return bindActionCreators(actionCreators, dispatch);
  /* Note: bindActionCreators will alos make these actions available to all children */
}

// We create an <App/> component which is just our <Main/> component with it's props
// populated with our functions (increment & decrement) and our state (counter)

var App = connect(mapStateToProps, mapDispatchToProps)(Main);

/*
  Rendering
  This is where we hook up the Store with our actual component 
*/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
