var express = require('express')
var router = express.Router();
var post = require('./post.js');

router.route('/')
    .post(post)


module.exports = router;