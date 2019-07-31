var express = require('express')
var router = express.Router();
var getUsers = require('./get.js');
var private = app_require('/utils/checkAuth.js');

router.route('/')
    .all(private)
    .get(getUsers)

module.exports = router;