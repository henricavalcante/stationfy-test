import React from 'react';
import token from '../token';
import 'whatwg-fetch';

import Post from './Post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sortFunction: this.handleSortPopular
    };
  }

  componentDidMount() {
    this.loadPosts();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    if (window.scrollY - documentHeight + window.innerHeight === 0) {
      this.loadPosts();
    }
  }

  formatDaysAgo(days) {
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    const today = new Date();
    let day = new Date(today.setDate(today.getDate() - days));
    if (days < 7) {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
      return `${weekdays[day.getDay()]}`;
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[day.getMonth()]} ${day.getDate()}`;
  }

  loadPosts() {
    const url = `https://api.producthunt.com/v1/categories/tech/posts?days_ago=${this.state.posts.length}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };
    fetch(url, { method: 'GET', headers: headers })
    .then(res => res.json())
    .then(json  => {
      let newPosts = this.state.posts;
      newPosts.push(json.posts);
      this.setState({ posts: newPosts });
    });
  }

  sortPosts(sortField) {
    this.setState({
      sortField: sortField
    });
  }

  handleSort(a, b) {
    return b[this.state.sortField] - a[this.state.sortField];
  }

  render() {
    let fetchedPosts = this.state.posts.map((dayPosts, index) =>
                                            <section key={ index } className="posts-group">
                                              <h2>{ this.formatDaysAgo(index) }</h2>
                                              { dayPosts
                                                .sort(this.handleSort.bind(this))
                                                .map(post => <Post key={ post.id } post={ post } />) }
                                              </section>
                                           );
                                           return (
                                             <section>
                                               <div className="posts-controls">
                                                 <button onClick={ this.sortPosts.bind(this, 'votes_count') }>Popular</button>
                                                 <button onClick={ this.sortPosts.bind(this, 'id') }>Newest</button>
                                               </div>
                                               { fetchedPosts }
                                             </section>
                                           );

  }
}

export default Posts;
