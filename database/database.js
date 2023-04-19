const Sequelize = require("sequelize");

//ACESSO DB
const DATABASE = "nodeprojeto1";
const DB_USER = "nodeproject1";
const DB_PASSWORD = "N0d3J52320@";
const DB_HOST = "localhost"

const connection = new Sequelize(DATABASE,DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql',
    /*dialectOptions: {
        socketPath: '/var/run/mysqld/mysqld.sock'
    }*/ // NECESSÁRIO PARA DEPLOY EM LINUX (DIGITAL OCEAN)
});

module.exports = connection;
//user: nodeproject1, senha: N0d3J52320@
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'abc@123';
//INSTALL PM2 (NODEJS APP EM BACKGROUND) -> npm install -g pm2
//Start -> pm2 start index.js