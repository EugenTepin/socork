var express = require('express')
var router = express.Router();
var addSubscription = require('./post.js');
var deleteSubscription = require('./delete.js');
var private = app_require('/utils/checkAuth.js');


router.route('/:userid')
    .all(private)
    .post(addSubscription)
    .delete(deleteSubscription)

module.exports = router;