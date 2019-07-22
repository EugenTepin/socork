const jwt = require('jsonwebtoken');
const config = app_require('./config.js');

module.exports = function (req, res, next) {
    console.log('Checking token');
    let token = req.get['x-access-token'] || req.get['authorization']; // Express headers are auto converted to lowercase
    //console.log(token);
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        try {
            var decoded = jwt.verify(token, config.app.secret);
            res.locals.user = {
                id: decoded.id,
                email: decoded.email
            };
            next();
            //return;
        } catch (err) {
            console.log('Bad token');
            res.status(401).json({ message: 'Invalid token' });
        }
    }
    res.status(401).json({ message: 'Authentication required' });
}