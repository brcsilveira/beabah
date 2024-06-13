const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Perfil = sequelize.define('perfil', {
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
    id_transacao: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    funcoes: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    }
}, {
    tableName: 'perfil',
    schema: 'beabah',
    timestamps: true
});

module.exports = Perfil;
