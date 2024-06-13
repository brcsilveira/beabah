const Perfil = require('./perfil');
const Modulo = require('./modulos');
const PerfilModulo = require('./perfil_modulos');

Perfil.belongsToMany(Modulo, { through: PerfilModulo, foreignKey: 'id_perfil' });
Modulo.belongsToMany(Perfil, { through: PerfilModulo, foreignKey: 'id_modulo' });