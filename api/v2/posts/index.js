var express = require('express')
var router = express.Router();
var myPostRouter = require('./my');
var subscriptionsPostRouter = require('./my-subscriptions');
//var getPosts = require('./get.js');
var postPosts = require('./post.js');
var private = app_require('/utils/checkAuth.js');

router.route('/')
    .all(private)
    //.get(getPosts)
    .post(postPosts)

router.use('/my', myPostRouter);
router.use('/my-subscriptions', subscriptionsPostRouter);

module.exports = router;