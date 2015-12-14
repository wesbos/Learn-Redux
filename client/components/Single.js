import React from 'react';
import Photo from './Photo';
import { findWhere, findIndex } from 'lodash';

const Single = React.createClass({
  displayName : 'Single',
  componentDidMount() {
    // find the post that we want    
    var i = findIndex(this.props.posts,(post)=> post.id === this.props.params.photoid);
    this.setState({ i : i });
  },
  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <strong>Hi</strong>
        {<Photo key={this.state.i} i={this.state.i} post={this.props.posts[this.state.i]} {...this.props} />}
      </div>
    );
  }
});

export default Single;
