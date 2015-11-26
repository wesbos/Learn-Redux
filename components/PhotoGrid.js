import React from 'react';
import Comments from './Comments';

const PhotoGrid = React.createClass({
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
        <img src={post.src} alt={post.caption} onDoubleClick={this.props.increment.bind(null,i)}/>
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

export default PhotoGrid;
