
// would return a single post with {id} populated with its number of likes and comments


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  const fetchPostData = async () => {
    try {
      // Send a GET request to fetch the post along with like and comment counts
      const response = await axios.get(`/api/posts/${postId}`);
      const { post, likeCount, commentCount } = response.data;

      setPost(post);
      setLikeCount(likeCount);
      setCommentCount(commentCount);
    } catch (error) {
      console.error('Failed to fetch post data:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Likes: {likeCount}</p>
      <p>Comments: {commentCount}</p>
    </div>
  );
}

export default PostDetail;
