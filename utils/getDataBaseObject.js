const Sequelize = require('sequelize');
const config = app_require('./config.js');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres'
});
sequelize.authenticate()
    //.then(function () { })
    .catch(function (e) {
        console.log(e);
    });

module.exports = sequelize;