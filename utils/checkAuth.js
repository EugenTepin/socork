const verifyToken = app_require('./utils/verifyToken.js');
const errors = app_require('./utils/errors.js');
const AuthorizationError = errors.AuthorizationError;

module.exports = function (req, res, next) {
    console.log('Checking token');
    let token = req.headers['authorization']; // Express headers are auto converted to lowercase
    console.log(token);
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        verifyToken(token).then(function (decoded) {
            res.locals.user = {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email
            };
            next();
        }).catch(function (e) {
            console.log('Bad token');
            next(new AuthorizationError('Unauthorized.'));
        });
    } else {
        next(new AuthorizationError('Unauthorized.'));
    }

}