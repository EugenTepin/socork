const makeToken = app_require('./utils/makeToken.js');
const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;
//const ValidationError = errors.ValidationError;
const ParameterRequiredError = errors.ParameterRequiredError;
const AuthorizationError = errors.AuthorizationError;

function validate(req, res, next) {
    console.log('Auth POST validate');
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (email === void 0 || email === '') {
        throw new ParameterRequiredError('email');
    }

    if (password === void 0 || password === '') {
        throw new ParameterRequiredError('password');
    }
    res.locals.user = {
        email: email,
        password: password
    };
    next();
};

function auth(req, res, next) {
    console.log('Auth POST')
    var email = res.locals.user.email;
    var password = res.locals.user.password;
    db.query('SELECT name, id, email FROM users WHERE email=:email AND password=:password;', {
        replacements: {
            email: email,
            password: password
        },
        type: db.QueryTypes.SELECT
    }
    ).then(function (result) {
        console.log(result);
        if (result.length === 0) {
            throw new AuthorizationError('Unauthorized.');
        }
        let user = result.shift();
        let tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        console.log(tokenPayload);
        return makeToken(tokenPayload);

    }).then(function (token) {
        res.set('Authorization', 'Bearer ' + token);
        res.status(200).end();

    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [validate, auth];