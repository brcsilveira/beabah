const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const bcrypt = require('bcryptjs');

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
        allowNull: true // Permite valores nulos (temporário)
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
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            user.senha = await bcrypt.hash(user.senha, 10);
        },
        beforeUpdate: async (user) => {
            if (user.changed('senha')) {
                user.senha = await bcrypt.hash(user.senha, 10);
            }
        }
    }
});

// Exporta o modelo
module.exports = Usuario;
