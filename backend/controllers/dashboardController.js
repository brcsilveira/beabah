const Usuario = require('../models/usuarios');
const Perfil = require('../models/perfil');
const Modulo = require('../models/modulos');
const Transacao = require('../models/transacoes');
const Funcao = require('../models/funcoes');

exports.getDashboardData = async (req, res) => {
    try {
        const usersCount = await Usuario.count();
        const profilesCount = await Perfil.count();
        const modulesCount = await Modulo.count();
        const transactionsCount = await Transacao.count();
        const functionsCount = await Funcao.count();

        res.status(200).json({
            usersCount,
            profilesCount,
            modulesCount,
            transactionsCount,
            functionsCount
        });
    } catch (error) {
        console.error('Erro ao buscar os dados do dashboard:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados do dashboard.' });
    }
};