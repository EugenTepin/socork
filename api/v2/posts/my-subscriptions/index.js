var express = require('express')
var router = express.Router();
var getPost = require('./get.js');
// var putPost = require('./put.js');
// var deletePost = require('./delete.js');
var private = app_require('/utils/checkAuth.js');


router.route('/')
    .all(private)
    .get(getPost)
// .put(putPost)
// .delete(deletePost)

module.exports = router;