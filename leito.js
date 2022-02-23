const Sequelize = require('sequelize');
const database = require('./db');

const Leito = database.define('leito', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paciente: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    sexo: Sequelize.STRING,
    ocupacao: Sequelize.STRING
})

module.exports = Leito;