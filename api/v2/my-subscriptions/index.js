var express = require('express')
var router = express.Router();
var subscriptionRouter = require('./userid');
//var private = app_require('/utils/checkAuth.js');

router.route('/')
// .all(private)
// .get(getFollowers)
// .post(postFollowers)

//router.use('/:userid', subscriptionRouter)
router.use('/', subscriptionRouter)

module.exports = router;