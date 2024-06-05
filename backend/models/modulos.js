const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

// Define o modelo 'Usuario'
const Modulos = sequelize.define('modulos', {
    // Atributos do modelo
    id_modulo: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome_modulo: {
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
        allowNull: true
    }
}, {
    // Opções do modelo
    tableName: 'modulos',
    schema: 'beabah',
    timestamps: true // Sequelize adiciona automaticamente os campos createdAt e updatedAt
});

// Exporta o modelo
module.exports = Modulos;