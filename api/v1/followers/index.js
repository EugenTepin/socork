var express = require('express')
var router = express.Router();
var followerRouter = require('./id');
var getFollowers = require('./get.js');
var postFollowers = require('./post.js');
var private = app_require('/api/v1/auth/checkToken.js');

router.route('/')
    .all(private)
    .get(getFollowers)
    .post(postFollowers)

router.use('/:id', followerRouter)

module.exports = router;