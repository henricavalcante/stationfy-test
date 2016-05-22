import React from 'react';
import Modal from 'react-modal';
import PostComments from './PostComments';
import token from '../token';

import 'whatwg-fetch';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post
    };
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  afterOpenModal() {

    const url = `https://api.producthunt.com/v1/posts/${this.state.post.id}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };
    fetch(url, { method: 'GET', headers: headers })
    .then(res => res.json())
    .then(json  => {
      this.setState({ post: json.post });
    });
  }

  render() {
    const post = this.state.post;
    const comments = (post.comments)
      ? <PostComments comments={ post.comments } />
      : <span></span>;
      return (
        <article>
          <a href='#' onClick={ this.openModal.bind(this) }>
            <div>
              <img height="80" width="80" src={ post.thumbnail.image_url }/>
            </div>
            <div>
              <span>{ post.name }</span>
              <span>{ post.tagline }</span>
            </div>
            <div className="meta">
              <div className="actionButtons">
                <button>{ post.votes_count }</button>
                <button>{ post.comments_count }</button>
              </div>
            </div>
          </a>
          <Modal
            isOpen={ this.state.modalIsOpen }
            onAfterOpen={ this.afterOpenModal.bind(this) }
            onRequestClose={ this.closeModal.bind(this) }
          >

            <button onClick={ this.closeModal.bind(this) }>X</button>
            <h1>{ post.name }</h1>
            <h2>{ post.tagline }</h2>
            <ul>
              {
                this.state.post.topics.map(topic => <li key={ topic.id }>{ topic.name }</li>)
              }
            </ul>
            { comments }
          </Modal>
        </article>
      );
  }
}

export default Post;
