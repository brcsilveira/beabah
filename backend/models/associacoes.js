const Perfil = require('./perfil');
const Modulo = require('./modulos');
const PerfilModulo = require('./perfil_modulos');
const Transacao = require('./transacoes');
const ModuloTransacao = require('./modulos_transacoes');

// Perfil e Modulo
Perfil.belongsToMany(Modulo, { through: PerfilModulo, foreignKey: 'id_perfil' });
Modulo.belongsToMany(Perfil, { through: PerfilModulo, foreignKey: 'id_modulo' });

// Modulo e Transacao
Modulo.belongsToMany(Transacao, { through: ModuloTransacao, foreignKey: 'id_modulo' });
Transacao.belongsToMany(Modulo, { through: ModuloTransacao, foreignKey: 'id_transacao' });