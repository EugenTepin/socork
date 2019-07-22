const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('social', 'postgres', 'qwerty', {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then((res) => {
        console.log(res);
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    //sequelize.close()