var express = require('express')
var router = express.Router();
var userRouter = require('./search');
//var getUsers = require('./get.js');
var postUsers = require('./post.js');
//var private = app_require('/utils/checkAuth.js');

router.route('/')
    .post(postUsers)
// .all(private)
// .get(getUsers)
router.use('/search', userRouter)

module.exports = router;