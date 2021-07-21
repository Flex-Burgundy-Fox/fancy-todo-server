var Sequelize = require('sequelize');
var sequelize = new Sequelize('todo_db', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize