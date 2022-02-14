//  Arquivo de criação de tabela, função async no arquivo index.js verificará se 
// a tabela já foi criada, caso sim o bloco não será executado novamente.

const Sequelize = require('sequelize');
const database = require('./db');

const Leito = database.define('leito', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // Não permite entradas de valores nulos
        primaryKey: true
    },
    paciente: {
        type: Sequelize.STRING, // É possível limitar o tamanho da string com "ex: string(250)" após a declaração de tipo
        allowNull: false
    },
    sexo: Sequelize.STRING,
    ocupacao: Sequelize.STRING 
})

module.exports = Leito;