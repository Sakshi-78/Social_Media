const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path to your User model

// Define the Local Strategy for user authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Specify the field for email
    },
    async (email, password, done) => {
      try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // If the user is not found, return an error
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

      // Check if the password is correct
     bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return done(err);
    }
    if (!isMatch) {
      return done(null, false, { message: 'Invalid email or password' });
    }
    // If authentication is successful, return the user
    return done(null, user);
  });
  

        // If authentication is successful, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
