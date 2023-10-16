import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch the user's profile
    axios.get('/api/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user profile:', error);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userData.name}</p>
          <p>Followers: {userData.followers}</p>
          <p>Followings: {userData.followings}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
