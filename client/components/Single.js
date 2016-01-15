import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import { logException } from '../data/config';

const Single = React.createClass({
  
  displayName : 'Single',
  
  render() {
    const i = this.props.posts.findIndex((post)=> post.code === this.props.params.postId);
  
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
