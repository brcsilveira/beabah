const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ModuloTransacao = sequelize.define('modulos_transacoes', {
    id_associacao: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_modulo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'modulos',
            key: 'id_modulo'
        }
    },
    id_transacao: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'transacoes',
            key: 'id_transacao'
        }
    }
}, {
    tableName: 'modulos_transacoes',
    schema: 'beabah',
    timestamps: false
});

module.exports = ModuloTransacao;