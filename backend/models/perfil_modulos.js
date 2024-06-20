const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerfilModulo = sequelize.define('perfil_modulos', {
    id_associacao: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_perfil: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'perfil',
            key: 'id_perfil'
        }
    },
    id_modulo: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
            model: 'modulos',
            key: 'id_modulo'
        }
    }
}, {
    tableName: 'perfil_modulos',
    schema: 'beabah',
    timestamps: false
});

module.exports = PerfilModulo;
