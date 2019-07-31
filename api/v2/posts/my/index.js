var express = require('express')
var router = express.Router();
var getPosts = require('./get.js');
// var putPost = require('./put.js');
// var deletePost = require('./delete.js');
var private = app_require('/utils/checkAuth.js');


router.route('/')
    .all(private)
    .get(getPosts)
// .put(putPost)
// .delete(deletePost)

module.exports = router;