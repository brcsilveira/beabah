const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

// Define o modelo 'Perfil'
const Perfil = sequelize.define('perfil', {
    // Atributos do modelo
    id_perfil: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome_perfil: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_transacao: {
        type: DataTypes.BIGINT,
        allowNull: true // Permite valores nulos (temporário)
    }
}, {
    // Opções do modelo
    tableName: 'perfil',
    schema: 'beabah',
    timestamps: true // Sequelize adiciona automaticamente os campos createdAt e updatedAt
});

// Exporta o modelo
module.exports = Perfil;