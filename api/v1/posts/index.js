var express = require('express')
var router = express.Router();
var postRouter = require('./id');
var getPosts = require('./get.js');
var postPosts = require('./post.js');
var private = app_require('/utils/checkToken.js');

router.route('/')
    .all(private)
    .get(getPosts)
    .post(postPosts)

router.use('/:id', postRouter)

module.exports = router;