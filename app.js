
global.app_require = function (name) {
    return require(__dirname + '/' + name);
}
const express = require('express');
const config = require('./config.js');
const cors = require('cors')
var apiRouter = require('./api');

const errors = require('./utils/errors.js');
const AppError = errors.AppError;
const ValidationError = errors.ValidationError;
const ParameterRequiredError = errors.ParameterRequiredError;
const AuthorizationError = errors.AuthorizationError;

var app = express();
app.use(function (req, res, next) {
    console.log('=========== new request ==============');
    next()
});
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use(function (err, req, res, next) {
    if (err instanceof AuthorizationError) {
        console.log(err);
        res.status(403);
        res.json({ message: err.message });
        return;
    }

    if (err instanceof ValidationError) {
        console.log(err);
        res.status(400);
        res.json({ message: err.message });
        return;
    }

    if (err instanceof AppError) {
        console.log(err.cause);
        res.status(500);
        res.json({ message: 'Application error that is all we know.' });
        return;
    }

    console.log("====> \n" + err);
    res.status(500).json({ message: 'Unknown error.' });
}
);


app.listen(config.app.port, () => console.log(`Example app listening on port ${config.app.port}!`));







