const sequelize = require('sequelize');
const conexao = require('./database');

const Pergunta = conexao.define('Pergunta', {
    titulo:{
        type: sequelize.STRING,
        allowNull:false
    }, 
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
        
});
Pergunta.sync({force:false}).then(() => {})
module.exports = Pergunta;