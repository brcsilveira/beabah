const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

// Define o modelo 'Usuario'
const Transacoes = sequelize.define('transacoes', {
    // Atributos do modelo
    id_transacao: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome_transacao: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_funcao: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    // Opções do modelo
    tableName: 'transacoes',
    schema: 'beabah',
    timestamps: true // Sequelize adiciona automaticamente os campos createdAt e updatedAt
});

// Exporta o modelo
module.exports = Transacoes;