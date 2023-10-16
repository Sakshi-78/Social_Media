const Post = require("../models/post");

module.exports.getNewpost =  async (req, res) => {
    try {
      const posts = await Post.find(); // Retrieve all posts from the database
      res.status(200).json(posts); // Send the posts as a JSON response
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch posts' });
    }
  }


module.exports.postNewpost =  async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.id; // Assuming you have user data in the req.user object
  
      // Create a new Post instance
      const newPost = new Post({
        title,
        description,
        createdBy: userId,
      });
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      // Return the Post-ID, Title, Description, and Created Time in UTC
      res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        description: savedPost.description,
        createdTime: savedPost.createdAt.toISOString(),
      });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create the post' });
    }
  }

module.exports.deletePost =  async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id; // Assuming you have user data in the req.user object
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (post.createdBy.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }
  
      // Perform the post deletion
      await Post.findByIdAndDelete(postId);
  
      return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete the post' });
    }
  }

  module.exports.postLikepost = async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id; // Assuming you have user data in the req.user object
  
      // Find the post by ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has already liked the post
      if (post.likes.includes(userId)) {
        return res.status(400).json({ message: 'You have already liked this post' });
      }
  
      // Add the user's ID to the post's likes
      post.likes.push(userId);
  
      // Save the updated post
      await post.save();

      return res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to like the post' });
    }
  }

  module.exports.postunLikepost = async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id; // Assuming you have user data in the req.user object
  
      // Find the post by ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has liked the post
      if (!post.likes.includes(userId)) {
        return res.status(400).json({ message: 'You have not liked this post' });
      }
  
      // Remove the user's ID from the post's likes
      post.likes = post.likes.filter((id) => id !== userId);

      // Save the updated post
      await post.save();
  
      return res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to unlike the post' });
    }
  }

  module.exports.postCommentpost = async (req, res) => {
    try {
      const postId = req.params.id;
      const { comment } = req.body;
      const userId = req.user.id; // Assuming you have user data in the req.user object
  
      // Find the post by ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Create a new comment object
      const newComment = {
        user: userId,
        text: comment,
    };

    // Add the comment to the post's comments array
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    // Return the Comment-ID (index in the comments array)
    const commentId = post.comments.indexOf(newComment);
    return res.status(201).json({ commentId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add the comment' });
  }
}

module.exports.getPost =  async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Find the post by ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Count the number of likes and comments
      const likeCount = post.likes.length;
      const commentCount = post.comments.length;
  
      // Return the post with like and comment counts
      return res.status(200).json({
        post: {
          id: post._id,
          title: post.title,
          description: post.description,
        },
        likeCount,
        commentCount,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve the post' });
    }
  }

module.exports.getAllpost =  async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have user data in the req.user object
  
      // Find all posts created by the authenticated user, sorted by creation time
      const posts = await Post.find({ createdBy: userId }).sort({ createdAt: 'desc' });
  
      const formattedPosts = posts.map((post) => ({
        id: post._id,
        title: post.title,
        desc: post.description,
        created_at: post.createdAt,
        comments: post.comments,
        likes: post.likes.length,
      }));
  
      return res.status(200).json(formattedPosts);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch posts' });
    }
  }

