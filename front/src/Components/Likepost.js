import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikePost({ postId, onLike }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the authenticated user has already liked the post
    // This is typically done by querying your backend to determine the current like status
    checkLikeStatus();
  }, [postId]);

  const checkLikeStatus = async () => {
    try {
      // Send a GET request to check the like status for the authenticated user
      const response = await axios.get(`/api/posts/${postId}/like`);

      if (response.data.liked) {
        setLiked(true);
      }
    } catch (error) {
      console.error('Failed to check like status:', error);
    }
  };

  const handleLike = async () => {
    try {
      // Send a POST request to like the post
      const response = await axios.post(`/api/posts/like/${postId}`);

      if (response.status === 200) {
        setLiked(true);
        // Trigger the onLike callback to update the UI
        onLike(postId);
      } else {
        alert('Failed to like the post. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while liking the post. Please try again.');
    }
  };

  return (
    <div>
      {liked ? (
        <button disabled>Liked</button>
      ) : (
        <button onClick={handleLike}>Like Post</button>
      )}
    </div>
  );
}

export default LikePost;
