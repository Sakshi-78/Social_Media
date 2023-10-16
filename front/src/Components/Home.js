import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletePost from './Deletepost';
import LikePost from './Likepost';
import UnLikePost from './Unlikepost';
import Comment from '../Components/Comment';
import { v4 as uuidv4 } from 'uuid';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [likeposts, setlikePosts] = useState([]);
  const [unlikeposts, setunlikePosts] = useState([]);
  const [comments, setComments] = useState([]); // Use an empty array initially

  useEffect(() => {
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

  const handleDeletePost = (postId) => {
    // Remove the deleted post from the UI
    setPosts(posts.filter((post) => post.id !== postId));
  };
  const handleLikePost = (postId) => {
    // Update the UI to reflect the liked status of the post
    setlikePosts(likeposts.map((post) => {
      if (post.id === postId) { // Change "likepost" to "post"
        return { ...post, liked: true };
      }
      return post;
    }));
  };
  const handleUnLikePost = (postId) => {
    // Remove the unliked post from the posts list
    setunlikePosts(unlikeposts.filter((post) => post.id !== postId)); // Change "unlikepost" to "post"
  };
  const handleCommentAdded = (postId, commentText) => {
    // Generate a unique comment ID using uuidv4()
    const commentId = uuidv4();
    // Update the UI to reflect the added comment
    setComments([...comments, { id: commentId, text: commentText }]);
  };

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <DeletePost postId={post.id} onDelete={handleDeletePost} />
            <LikePost postId={post.id} onLike={handleLikePost} />
            <UnLikePost postId={post.id} onUnLike={handleUnLikePost} />
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
            <Comment postId={post.id} onCommentAdded={handleCommentAdded} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
