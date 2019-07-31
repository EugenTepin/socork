const jwt = require('jsonwebtoken');
const config = app_require('./config.js');
module.exports = function (tokenPayload) {
    return new Promise(function (resolve, reject) {
        jwt.sign(tokenPayload, config.app.secret, {
            expiresIn: '5h'
        }, function (err, token) {
            if (err !== null) {
                reject(err);
            }
            resolve(token);
        });
    });
}
