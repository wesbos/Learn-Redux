import React from 'react';
import Comments from './Comments';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';

const Photo = React.createClass({
  
  displayName : 'Photo',
  
  render() {
    const { post, i, comments } = this.props;
    return (
      <figure key={i} className="grid-figure">
        
        <div className='grid-photo-wrap'>
          <Link to={`/view/${post.code}`}>
            <img className='grid-photo' src={post.display_src} alt={post.caption} />
          </Link>

          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes.count} className="likes-heart">{post.likes.count}</span>
          </CSSTransitionGroup>

        </div>

        <figcaption>
          <p>{post.caption.text}</p>

          <div className="control-buttons">
            <button onClick={this.props.increment.bind(null,i)} className="likes">&hearts; {post.likes.count}</button>
    
            <Link to={`/view/${post.code}`} className="button">
              <span className="comment-count">
                <span className="speech-bubble"></span> {(comments[post.code] ? comments[post.code].length : post.comments.count)}
              </span>
            </Link>
          </div>

        </figcaption>

      </figure>
    )
    return (
      <figure key={i} className="grid-figure">

        <div className="grid-photo-wrap">
          <Link to={`/view/${post.id}`}>
            <img className="grid-photo" src={post.src} alt={post.caption} onDoubleClick={(e) => this.handleDoubleClick(e,i)}/>
          </Link>

          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>

        </div>

        <figcaption>
          <p>{post.caption.text}</p>
          <button onClick={this.props.increment.bind(null,i)} className="likes">&hearts;{post.likes}</button>
          <span className="comment-count">&#x1f4ac;💬</span>
        </figcaption>
      </figure>
    );
  }
});

export default Photo;
