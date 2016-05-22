import React from 'react';

class PostComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comment = this.props.comment;
    const child_comments = (comment.child_comments)
      ? <ul>{ comment.child_comments.map(child_comment => <PostComment key={ child_comment.id } comment={ child_comment } />) }</ul>
      : null;
      return (
        <li>
          <img src={ comment.user.image_url['30px'] } alt={ comment.user.name } />
          <h3>{ comment.user.name }</h3>
          <h4>{ comment.user.headline }</h4>
          { comment.body }
          { child_comments }
        </li>
      );
  }
}

export default PostComment;
