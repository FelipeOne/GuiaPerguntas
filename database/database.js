const sequelize = require('sequelize');

const conexao = new sequelize('guiaperguntas', 'root', '4752',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conexao;