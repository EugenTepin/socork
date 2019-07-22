
global.app_require = function (name) {
    return require(__dirname + '/' + name);
}
const express = require('express');
const Sequelize = require('sequelize');
const config = require('./config.js');
const cors = require('cors')
var apiRouter = require('./api');

var app = express();

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(function () {

        app.use(function (req, res, next) {
            console.log('=========== new request ==============');
            next()
        });
        app.locals.db = sequelize;
        app.use(cors());
        app.use(express.json());
        app.use('/api', apiRouter);
        app.listen(config.app.port, () => console.log(`Example app listening on port ${config.app.port}!`));
    })
    .catch(function (e) {
        console.log(e);
    })








// app.use(express.static('public'))

// var options = {
//     root: __dirname,
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
// }





// app.post('/login', function (req, res, next) {
//     // fs.readFile('./data/users.json', 'utf8', (err, data) => {
//     //     if (err) {
//     //         res.json({ 'msg': err });
//     //     }
//     //     var obj = JSON.parse(data);
//     //     // делаем что-то с obj
//     //     res.json(obj);
//     // });

// })

// app.post('/register', function (req, res, next) {
//     //
//     //console.log(req.body);
//     var payload = {
//         token: jwt.sign(req.body, secret)
//     }
//     res.json(payload);
// })




