var express = require('express')
var router = express.Router();
var getFollower = require('./get.js');
var putFollower = require('./put.js');
var deleteFollower = require('./delete.js');
var private = app_require('/api/v1/auth/checkToken.js');


router.route('/')
    .all(private)
    .get(getFollower)
    .put(putFollower)
    .delete(deleteFollower)

module.exports = router;