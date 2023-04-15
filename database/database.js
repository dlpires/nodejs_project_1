const Sequelize = require("sequelize");

//ACESSO DB
const DATABASE = "nodeprojeto1";
const DB_USER = "nodeproject1";
const DB_PASSWORD = "N0d3J52320@";
const DB_HOST = "localhost"

const connection = new Sequelize(DATABASE,DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql'
});

module.exports = connection;
//user: nodeproject1, senha: N0d3J52320@