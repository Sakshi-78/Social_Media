import React from 'react';
import axios from 'axios';

function UnLikePost({ postId, onUnLike }) {
  const handleUnLike = async () => {
    try {
      const response = await axios.post(`/api/unlike/${postId}`);

      if (response.status === 200) {
        // Trigger the onUnLike callback to update the UI
        onUnLike(postId);
      } else {
        alert('Failed to unlike the post. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while unliking the post. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleUnLike}>Unlike Post</button>
    </div>
  );
}

export default UnLikePost;
