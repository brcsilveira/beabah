const Perfil = require('../models/perfil');

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