import React from 'react';
import axios from 'axios';

function DeletePost({ postId, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      if (response.status === 200) {
        // If the deletion was successful, trigger the onDelete callback
        onDelete(postId);
      } else {
        alert('Failed to delete the post. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while deleting the post. Please try again.');
    }
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
}

export default DeletePost;
