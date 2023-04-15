const Sequelize = require("sequelize");

const connection = new Sequelize('nodeprojeto1','nodeproject1','N0d3J52320@',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
//user: nodeproject1, senha: N0d3J52320@