import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/all_posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
            <p>Comments: {post.comments.length}</p>
            <p>Likes: {post.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPosts;
