import React from 'react';
import Comments from './Comments';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Photo = React.createClass({
  
  handleDoubleClick(e, i) {
    const { offsetX, offsetY } = e.nativeEvent;
    this.props.increment(i);
  },

  render() {
    var { comments, post, i } = this.props;
    return (
      <figure key={i}>

        <div className="grid-photo-wrap">
          <img className="grid-photo" src={post.src} alt={post.caption} onDoubleClick={e => this.handleDoubleClick(e,i)}/>

          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>

        </div>

        <figcaption>
          <p>{post.caption}</p>
          <button onClick={this.props.increment.bind(null,i)} className="likes">&hearts;{post.likes}</button>
          <span className="comment-count">&#x1f4ac;💬</span>
        </figcaption>
        <Comments {...this.props} comments={comments[post.id]} postId={post.id} />
      </figure>
    );
  }
});

export default Photo;
