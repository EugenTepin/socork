const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = app_require('./config.js');

function validate(req, res, next) {
    console.log('Users POST validate');
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (name === void 0 || name === '') {
        res.status(400).json({ message: 'Blank or omitted user name!' });
    }

    if (email === void 0 || email === '') {
        res.status(400).json({ message: 'Blank or omitted user email!' });
    }

    if (password === void 0 || password === '') {
        res.status(400).json({ message: 'Blank or omitted user password!' });
        //return; ???
    }
    res.locals.user = {
        name: name,
        email: email,
        password: password
    };
    next();
};


function createNewUser(req, res) {
    console.log('Users POST')
    const db = req.app.locals.db;
    const secret = config.app.secret;
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
            email: user.email
        };
        const token = jwt.sign(tokenPayload, secret, {
            expiresIn: '5m'
        });

        res.set('Authorization', 'Bearer ' + token);
        res.status(200).end();
    }).catch(function (e) {
        if (e.name === 'SequelizeUniqueConstraintError' && e.parent.constraint === 'email') {
            res.status(409).json({ message: 'User with the same name is already exists.' });
            return;
        }
        console.log(e);
        res.status(500).json({ message: 'Unknown error.' });
    })
};


module.exports = [validate, createNewUser];