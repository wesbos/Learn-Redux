import React from 'react';

const Comments = React.createClass({
  renderComment(data, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{data.author} : </strong>
          {data.comment}
          <button onClick={this.props.removeComment.bind(null,this.props.postId, i)}>&times;</button>
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
        <div className="comment">
          {comments.map(this.renderComment)}
        </div>
        <form onSubmit={this.handleSubmit} ref="commentForm">
          <input type="text" ref="author" placeholder="author"/>
          <input type="text" ref="comment" placeholder="comment"/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
});

export default Comments;
