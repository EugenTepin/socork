var express = require('express')
var router = express.Router();
var versionRouter = require('./v2');

router.use('/v2', versionRouter);

module.exports = router;