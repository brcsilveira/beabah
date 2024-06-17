const Funcao = require('../models/funcoes');
const Modulo = require('../models/modulos');

// Rota POST para criar uma nova função
exports.createFunction = async (req, res) => {
    try {
        const { nome_funcao, descricao, id_modulo } = req.body;

        // Verifica se o módulo informado existe
        const modulo = await Modulo.findByPk(id_modulo);
        if (!modulo) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }

        const newFunction = await Funcao.create({ nome_funcao, descricao, id_modulo });
        res.status(201).json(newFunction);
    } catch (error) {
        console.error('Erro ao criar função:', error);
        res.status(500).json({ error: 'Erro ao criar função' });
    }
};

// Rota GET para obter todas as funções
exports.getFunctions = async (req, res) => {
    try {
        const functions = await Funcao.findAll();
        res.status(200).json(functions);
    } catch (error) {
        console.error('Erro ao obter funções:', error);
        res.status(500).json({ error: 'Erro ao obter funções' });
    }
};