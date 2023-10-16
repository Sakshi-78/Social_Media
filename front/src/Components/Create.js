import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch and display existing posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', newPost);
      // Add the newly created post to the list of posts
      setPosts([...posts, response.data]);
      // Clear the form
      setNewPost({ title: '', description: '' });
    } catch (error) {
      console.error('Failed to create a post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
      <div>
        <h2>Existing Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Created at: {post.createdTime}</p>
              <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
