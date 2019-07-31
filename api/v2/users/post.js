const crypto = require('crypto');
const makeToken = app_require('./utils/makeToken.js');
const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;
const ParameterRequiredError = errors.ParameterRequiredError;

function validate(req, res, next) {
    console.log('Users POST validate');
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (name === void 0 || name === '') {
        throw new ParameterRequiredError('name');
    }

    if (email === void 0 || email === '') {
        throw new ParameterRequiredError('email');
    }

    if (password === void 0 || password === '') {
        throw new ParameterRequiredError('password');
    }

    res.locals.user = {
        name: name,
        email: email,
        password: password
    };

    next();
};

function createNewUser(req, res, next) {
    console.log('Users POST')
    var user = res.locals.user;
    const hash = crypto.createHash('sha256');
    hash.update(user.password);

    db.query('INSERT INTO users (name, email, password) VALUES(:name, :email, :password) RETURNING id;', {
        replacements: {
            name: user.name,
            email: user.email,
            password: hash.digest('hex')
        },
        type: db.QueryTypes.INSERT
    }
    ).then(function (result) {
        console.log(result)
        var id = result[0][0].id;
        var tokenPayload = {
            id: id,
            name: user.name,
            email: user.email
        };
        return makeToken(tokenPayload);
    }).then(function (token) {
        res.set('Authorization', 'Bearer ' + token);
        res.status(200).end();
    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [validate, createNewUser];