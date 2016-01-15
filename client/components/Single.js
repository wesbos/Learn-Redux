import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import { findWhere, findIndex } from 'lodash';
import axios from 'axios';
import { commentEndpoint } from '../data/endpoints';

const Single = React.createClass({
  
  displayName : 'Single',

  getInitialState() {
    return {
      commentsLoaded : false
    }
  },

  componentWillMount() {
    //  Only Fetch comments if we haven't already
    let { postId } = this.props.params;

    if(!this.props.comments[postId]) {
      this.fetchComments(postId);
    } else {
      this.setState({ commentsLoaded: true })
    }
  },

  fetchComments(postId) {
    // find the post that we want 
    axios.get(commentEndpoint(postId))
      .then((response)=> {
        console.log('Got the comments:', response.data.media.comments.nodes);
        // load them into our redux state
        this.props.loadComments(response.data.media.comments.nodes, postId);
        // mark this component's state as loaded comments
        this.setState({ commentsLoaded: true })
    })
    .catch((err)=>console.error(err))
  
  },
  
  render() {
    const i = findIndex(this.props.posts,(post)=> post.code === this.props.params.postId);
    
    // Then we go ahead and return some JSX
    if(i < 0) {
      return (<strong>Loading...</strong>);
    }

    return (
      <div>
        <div className="single-photo">
          <Photo key={i} i={i} post={this.props.posts[i]} {...this.props} />
          <Comments {...this.props} postId={i} commentsLoaded={this.state.commentsLoaded} />
        </div>
      </div>
    );
  }
});

export default Single;
