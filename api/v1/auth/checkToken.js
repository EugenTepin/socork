var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    console.log('Checking token');
    next()
}