const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : {
        type: String
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if(!err) {
            this.password = hash;
            next();
        }
        else {
            console.log(err);
        }
    });
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, success) => {
        if(err) throw err;
        callback(null, success); 
    })
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    User.findOne({ username : username }, callback);
}
