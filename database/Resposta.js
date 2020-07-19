const sequelize = require('sequelize');
const conexao = require('./database');

const Resposta = conexao.define("respostas", {
    campo: {
        type: sequelize.TEXT,
        allownull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allownull: false
    }
});

Resposta.sync({force:false});

module.exports = Resposta;