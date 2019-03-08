const express = require('express');
const passport = require('passport');

const User = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', User.register);
router.post('/authenticate', User.authenticate);
router.get('/profile', passport.authenticate('jwt', { session : false }), User.profile);

module.exports = router;