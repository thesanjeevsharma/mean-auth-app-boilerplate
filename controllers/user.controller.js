const User = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

module.exports.register = function(req, res, next) {
    let newUser = new User(req.body);
    User.findOne({ username : newUser.username })
        .then((user) => {
            if(!user) {
                return newUser.save();
            }
            else {
                throw new Error('Username already taken!');
            }
        })
        .then((user) => {
            console.log(chalk.hex('#20C20E')("User registered: ",user.username,user.email));
            res.json({success: true, message: "User registered!", data: user});
        })
        .catch((err) => {
            console.log("Error caught, Bitch!");
            res.json({ success: false, message: err.message, data: null });
        });
}

module.exports.authenticate = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({ success : false, message : 'No such user', data : null });
        }
        else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(isMatch) {
                    const token = jwt.sign(user.toJSON(), require('../config/keys').JWT, {
                        expiresIn : 604800
                    });
                    return res.json({ success : true, message : 'Authenticated', data : { JWTtoken : token, id : user._id, name : user.name, username : user.username, email : user.email }});
                } else {
                    return res.json({ success : false, message : 'Not authenticated! Password incorrect', data : null });
                }
            })
        }
    })
}

module.exports.profile = function(req, res, next) {
    res.json({ success : true, message : 'Welcome, ' + req.user.name + "!", data : null});    
}
