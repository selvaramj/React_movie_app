import React, { Component } from 'react';
import { baseJsonPlaceHolderUrl as baseUrl } from '../../services/apiService';
import http from '../../services/httpService';
import Table from '../../components/table';

class Posts extends Component {
  state = { posts: [] };
  columns = [
    {
      path: 'title',
      label: 'Title',
      needSort: false,
      isLink: false,
    },
    {
      label: 'Update',
      content: (post) => (
        <button
          className='btn btn-primary'
          onClick={() => this.onUpdatePost(post)}
        >
          Update
        </button>
      ),
      needSort: false,
    },
    {
      label: 'Delete',
      content: (post) => (
        <button
          className='btn btn-danger'
          onClick={() => this.onDeletePost(post)}
        >
          Delete
        </button>
      ),
      needSort: false,
    },
  ];

  async componentDidMount() {
    const { data: posts } = await http.get(`${baseUrl}posts`);
    console.log(posts);
    this.setState({ posts });
  }

  onDeletePost = async (post) => {
    const orgPosts = [...this.state.posts];
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete(`${baseUrl}posts/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert('An expected ERROR - this post already deleted');
      }
      this.setState({ posts: orgPosts });
    }
  };
  onUpdatePost = async (post) => {
    const orgPosts = [...this.state.posts];
    post.title = 'Updated';
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
    try {
      await http.put(`${baseUrl}posts/${post.id}`, post);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert('An expected ERROR - this post already updated');
      }
      this.setState({ posts: orgPosts });
    }
  };
  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await http.post(`${baseUrl}posts`, obj);
    console.log('Post ', post);
    this.setState({ posts: [post, ...this.state.posts] });
  };

  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Posts</h1>
        <div className='mt-2'>
          <button className='btn btn-secondary' onClick={this.handleAdd}>
            Add
          </button>
        </div>
        <Table columns={this.columns} data={this.state.posts} />
      </div>
    );
  }
}

export default Posts;
