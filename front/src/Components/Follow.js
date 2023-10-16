import React, { useState } from 'react';
import axios from 'axios';

function FollowButton({ userIdToFollow, isFollowing, onFollowToggle }) {
  const [isFollowingUser, setIsFollowingUser] = useState(isFollowing);

  const handleFollow = async () => {
    try {
      // Send a POST request to follow the user
      await axios.post(`/api/follow/${userIdToFollow}`);
      setIsFollowingUser(true);
      onFollowToggle(true);
    } catch (error) {
      console.error('Failed to follow the user:', error);
    }
  }

  const handleUnfollow = async () => {
    try {
      // Send a POST request to unfollow the user
      await axios.post(`/api/unfollow/${userIdToFollow}`);
      setIsFollowingUser(false);
      onFollowToggle(false);
    } catch (error) {
      console.error('Failed to unfollow the user:', error);
    }
  }

  return (
    <div>
      {isFollowingUser ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
}

export default FollowButton;
