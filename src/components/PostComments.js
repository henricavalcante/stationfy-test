import React from 'react';
import PostComment from './PostComment';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comments = this.props.comments || [];
    return (
      <ul>
        {
          comments.map(comment => <PostComment key={ comment.id } comment={ comment } />)
        }
      </ul>
    );
  }
}

export default PostComments;
