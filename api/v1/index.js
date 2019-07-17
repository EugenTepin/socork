var express = require('express')
var router = express.Router();
var followersRouter = require('./followers');
var usersRouter = require('./users');
var postsRouter = require('./posts');
var authRouter = require('./auth');

// var private = app_require('/api/v1/auth/checkToken.js');

// router.route('/')
//     .all(private)
//     .get(getFollowers)
//     .post(postFollowers)

router.use('/followers', followersRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/auth', authRouter);

module.exports = router;