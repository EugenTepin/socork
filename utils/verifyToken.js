const jwt = require('jsonwebtoken');
const config = app_require('./config.js');
module.exports = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.app.secret, function (err, decoded) {
            if (err !== null) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}
