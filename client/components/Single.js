import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import { findWhere, findIndex } from 'lodash';
import jsonp from 'jsonp';
import { commentEndpoint } from '../data/endpoints';

const Single = React.createClass({
  
  displayName : 'Single',

  componentWillMount() {
    //  Only Fetch comments if we haven't already
    let { postId } = this.props.params;

    if(!this.props.comments[postId]) {
      this.fetchComments(postId);
    }
  },

  fetchComments(postId) {
    // find the post that we want 
    jsonp(commentEndpoint(postId),null,(err, response) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log('Got the comments:', response);
      this.props.loadComments(response.data, postId);
    });
  },
  
  render() {
    var i = findIndex(this.props.posts,(post)=> post.id === this.props.params.postId);
    
    // Then we go ahead and return some JSX
    if(i < 0) {
      return (<strong>Loading...</strong>);
    }

    return (
      <div>
        <div className="single-photo">
          <Photo key={i} i={i} post={this.props.posts[i]} {...this.props} />
          <Comments {...this.props} postId={i} />
        </div>
      </div>
    );
  }
});

export default Single;
