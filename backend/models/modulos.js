const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário
const Funcao = require('./funcoes');

// Define o modelo 'Modulo'
const Modulo = sequelize.define('modulos', {
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
    }
}, {
    // Opções do modelo
    tableName: 'modulos',
    schema: 'beabah',
    timestamps: true // Sequelize adiciona automaticamente os campos createdAt e updatedAt
});

// Define a relação com funções
Modulo.hasMany(Funcao, { foreignKey: 'id_modulo' });
Funcao.belongsTo(Modulo, { foreignKey: 'id_modulo' });
Modulo.belongsToMany(Perfil, { through: 'perfil_modulos', foreignKey: 'id_modulo' });

// Exporta o modelo
module.exports = Modulo;