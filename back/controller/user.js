const User = require("../models/user");

module.exports.postFollow =  async (req, res) => {
    try {
      const currentUserId = req.user.id; // ID of the authenticated user
      const userIdToFollow = req.params.id; // ID of the user to follow
  
      // Check if the user to follow exists
      const userToFollow = await User.findById(userIdToFollow);
  
      if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is trying to follow themselves
      if (currentUserId === userIdToFollow) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
      }
      // Check if the user is already following the target user
    if (userToFollow.followers.includes(currentUserId)) {
        return res.status(400).json({ message: 'You are already following this user' });
      }
  
      // Add the current user to the followers of the target user
      userToFollow.followers.push(currentUserId);
      await userToFollow.save();
  
      return res.status(200).json({ message: 'You are now following this user' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to follow the user' });
    }
  }

module.exports.postUnfollow = async (req, res) => {
    try {
      const currentUserId = req.user.id; // ID of the authenticated user
      const userIdToUnfollow = req.params.id; // ID of the user to unfollow
  
      // Check if the user to unfollow exists
      const userToUnfollow = await User.findById(userIdToUnfollow);
  
      if (!userToUnfollow) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is trying to unfollow themselves
      if (currentUserId === userIdToUnfollow) {
        return res.status(400).json({ message: 'You cannot unfollow yourself' });
      }
  
      // Check if the user is not currently following the target user
      if (!userToUnfollow.followers.includes(currentUserId)) {
        return res.status(400).json({ message: 'You are not following this user' });
      }
  
      // Remove the current user from the followers of the target user
      userToUnfollow.followers = userToUnfollow.followers.filter((follower) => follower !== currentUserId);
      await userToUnfollow.save();
      return res.status(200).json({ message: 'You have unfollowed this user' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to unfollow the user' });
    }
  }

module.exports.getUser =  async (req, res) => {
    try {
      const currentUserId = req.user.id; // ID of the authenticated user
  
      // Fetch the user's profile information, including name, number of followers, and number of followings
      const user = await User.findById(currentUserId)
        .populate('followers') // Populate followers (assuming you have a "followers" field in your user model)
        .populate('followings'); // Populate followings (assuming you have a "followings" field in your user model)
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Extract the required information
      const userProfile = {
        name: user.username, // Replace with the actual field that stores the user's name
        followers: user.followers.length,
        followings: user.followings.length,
      };
  
      return res.status(200).json(userProfile);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  }
  