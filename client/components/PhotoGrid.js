import React from 'react';
import Photo from './Photo';

const PhotoGrid = React.createClass({
  
  displayName : 'PhotoGrid',
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.addItem(this.refs.item.value);
  },

  render() {
    let { posts, increment } = this.props;
    return (
      <div className="PhotoGrid">
        {posts.map((post,i) => <Photo {...this.props} key={i} i={i} post={post} />)}
      </div>
    );
  }
});

export default PhotoGrid;
