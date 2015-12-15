import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import { findWhere, findIndex } from 'lodash';
import jsonp from 'jsonp';
import { commentEndpoint } from '../data/endpoints';

const Single = React.createClass({
  
  displayName : 'Single',

  componentWillMount() {
    // find the post that we want    
    jsonp(commentEndpoint(this.props.params.photoid),null,(err, response) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log("Got the comments:", response.data);

      this.props.loadComments(response.data);
    });

  },
  
  render() {
    var i = findIndex(this.props.posts,(post)=> post.id === this.props.params.photoid);
    
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
