function authenticateUser(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // Redirect to the login page or return an unauthorized response
    res.status(401).json({ message: 'Unauthorized' });
  }
  
  module.exports = { authenticateUser };