const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = 'patera88';

// Função para gerar um token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id_usuario, codigo: user.codigo }, secret, { expiresIn: '1h' });
};

// Rota para login de usuário
exports.login = async (req, res) => {
    try {
        const { codigo, senha } = req.body;
        const user = await Usuario.findOne({ where: { codigo } });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

// Rota POST para criar um novo usuário
exports.createUser = async (req, res) => {
    try {
        const { nome_usuario, email, senha, id_perfil, codigo } = req.body;
        const newUser = await Usuario.create({ nome_usuario, email, senha, id_perfil, codigo });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Rota DELETE para deletar um usuário
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await user.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

// Rota GET para obter todos os usuários
exports.getUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
}; 

// Rota GET para obter um usuário pelo ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

//Rota PUT para atualizar um usuário
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_usuario, email, senha } = req.body;
        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        user.nome_usuario = nome_usuario;
        user.email = email;
        if (senha) {
            user.senha = senha; // O hook beforeUpdate cuidará do hash
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// Rota PUT para atualizar o perfil de um usuário
exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_perfil } = req.body;
        const user = await Usuario.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        user.id_perfil = id_perfil;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
};