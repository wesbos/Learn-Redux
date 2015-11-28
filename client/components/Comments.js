import React from 'react';

const Comments = React.createClass({
  renderComment(data, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{data.author}</strong>
          {data.comment}
          <button className="remove-comment" onClick={this.props.removeComment.bind(null,this.props.postId, i)}>&times;</button>
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
        
        {comments.map(this.renderComment)}
        <form onSubmit={this.handleSubmit} ref="commentForm" className="comment-form">
          <input type="text" ref="author" placeholder="author"/>
          <input type="text" ref="comment" placeholder="comment"/>
          <input type="submit" hidden/>
        </form>
      </div>
    );
  }
});

export default Comments;
