var express = require('express')
var router = express.Router();
var userRouter = require('./id');
var getUsers = require('./get.js');
var postUsers = require('./post.js');
var private = app_require('/utils/checkToken.js');

router.route('/')
    .post(postUsers)
    .all(private)
    .get(getUsers)


router.use('/:id', userRouter)

module.exports = router;