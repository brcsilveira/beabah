const Perfil = require('../models/perfil');
const Modulo = require('../models/modulos');
const PerfilModulo = require('../models/perfil_modulos');
const Usuario = require('../models/usuarios');

// Rota para obter os módulos associados a um perfil
exports.getAssociateModules = async (req, res) => {
    try {
        const { profileId } = req.params;
        const modules = await PerfilModulo.findAll({ where: { id_perfil: profileId } });
        res.status(200).json(modules);
    } catch (error) {
        console.error('Erro ao obter módulos associados:', error);
        res.status(500).json({ error: 'Erro ao obter módulos associados' });
    }
};

// Rota para associar um Perfil a Módulos
exports.associateModulesToProfile = async (req, res) => {
    try {
        const { profileId } = req.params;
        const { modules } = req.body;

        // Verifica se o perfil existe
        const profile = await Perfil.findByPk(profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }

        // Desassociar todas as transações existentes do perfil
        await PerfilModulo.destroy({ where: { id_perfil: profileId } });

        // Associar os novos módulos
        if (modules && modules.length > 0) {
            const associacoes = modules.map(moduleId => ({
                id_perfil: profileId,
                id_modulo: moduleId
            }));
            await PerfilModulo.bulkCreate(associacoes);
        }

        res.status(200).json({ message: 'Módulos associados com sucesso' });
    } catch (error) {
        console.error('Erro ao associar módulos:', error);
        res.status(500).json({ error: 'Erro ao associar módulos' });
    }
};

// Rota POST para criar um novo perfil 
exports.createProfile = async (req, res) => {
    try {
        const { nome_perfil, id_transacao, funcoes } = req.body;
        const newPerfil = await Perfil.create({ nome_perfil, id_transacao, funcoes });
        res.status(201).json(newPerfil);
    } catch (error) {
        console.error('Erro ao criar perfil:', error);
        res.status(500).json({ error: 'Erro ao criar perfil' });
    }
};

// Rota GET para obter todos os perfis
exports.getProfiles = async (req, res) => {
    try {
        const perfis = await Perfil.findAll();
        res.status(200).json(perfis);
    } catch (error) {
        console.error('Erro ao obter perfis:', error);
        res.status(500).json({ error: 'Erro ao obter perfis' });
    }
};

// Rota GET para obter os detalhes de um perfil pelo ID
exports.getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Perfil.findByPk(id);
        if (!perfil) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }
        res.status(200).json(perfil);
    } catch (error) {
        console.error('Erro ao obter perfil:', error);
        res.status(500).json({ error: 'Erro ao obter perfil' });
    }
};

// Rota PUT para atualizar um perfil
exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_perfil, id_transacao, funcoes } = req.body;
        const perfil = await Perfil.findByPk(id);
        if (!perfil) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }
        perfil.nome_perfil = nome_perfil;
        perfil.id_transacao = id_transacao;
        perfil.funcoes = funcoes;
        await perfil.save();
        res.status(200).json(perfil);
    }
    catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
};

// Rota DELETE para excluir um perfil
exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Perfil.findByPk(id);
        if (!perfil) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }

        // Desvincula os usuários associados ao perfil
        await Usuario.update(
            { id_perfil: null },  // Remove a referência ao perfil
            { where: { id_perfil: id } }
        );

        // Exclui as associações do perfil com os módulos
        await perfil.setModulos([]);

        await perfil.destroy();
        res.status(200).json({ message: 'Perfil excluído' });
    } catch (error) {
        console.error('Erro ao excluir perfil:', error);
        res.status(500).json({ error: 'Erro ao excluir perfil' });
    }
};