const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

// Define o modelo 'Usuario'
const Usuario = sequelize.define('usuario', {
    // Atributos do modelo
    id_usuario: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome_usuario: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_perfil: {
        type: DataTypes.BIGINT,
        allowNull: false // trocar no db
    },
    codigo: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true
    }
}, {
    // Opções do modelo
    tableName: 'usuario',
    schema: 'beabah',
    timestamps: true // Sequelize adiciona automaticamente os campos createdAt e updatedAt
});

// Exporta o modelo
module.exports = Usuario;
