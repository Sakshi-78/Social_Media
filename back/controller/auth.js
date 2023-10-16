const User = require("../models/user");
const passport = require('passport');

module.exports.postAuth = async (req, res, next) => {
    try {
        passport.authenticate('local', async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(401).json({ message: info.message });
                }

                req.logIn(user, async (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(200).json({ message: 'Authentication successful' });
                });
            } catch (err) {
                return next(err);
            }
        })(req, res, next);
    } catch (err) {
        return next(err);
    }
};
