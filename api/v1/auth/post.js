var jwt = require('jsonwebtoken')
module.exports = function (req, res) {
    console.log('Auth POST');
    res.status(200).send('Auth POST');
};