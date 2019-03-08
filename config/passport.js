const JwtStartegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const userController = require('../controllers/user.controller');
const Secret = require('./keys');

module.exports = function(passport) {
    let opts = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : Secret.JWT
    }
    passport.use(new JwtStartegy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err) {
                return done(err, false);
            }
            else if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
}