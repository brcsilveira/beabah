const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

// Define o modelo 'Usuario'
const Funcoes = sequelize.define('funcoes', {
    // Atributos do modelo
    id_funcao: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome_funcao: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    // Opções do modelo
    tableName: 'funcoes',
    schema: 'beabah',
    timestamps: true // Sequelize adiciona automaticamente os campos createdAt e updatedAt
});

// Exporta o modelo
module.exports = Funcoes;