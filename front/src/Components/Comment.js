import React, { useState } from 'react';
import axios from 'axios';

function Comment({ postId, onCommentAdded }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/posts/comment/${postId}`, {
        comment: commentText,
      });

      if (response.status === 201) {
        // Clear the comment input
        setCommentText('');
        // Trigger the onCommentAdded callback to update the UI
        onCommentAdded(postId, response.data.commentId);
      } else {
        alert('Failed to add the comment. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while adding the comment. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default Comment;
