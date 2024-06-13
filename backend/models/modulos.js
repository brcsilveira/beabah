const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Funcao = require('./funcoes');

const Modulo = sequelize.define('modulos', {
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
    }
}, {
    tableName: 'modulos',
    schema: 'beabah',
    timestamps: true
});

// Define a relação com funções
Modulo.hasMany(Funcao, { foreignKey: 'id_modulo' });
Funcao.belongsTo(Modulo, { foreignKey: 'id_modulo' });

module.exports = Modulo;
