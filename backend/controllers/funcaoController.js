const Funcao = require('../models/funcoes');
const Modulo = require('../models/modulos');

// Rota POST para criar uma nova função
exports.createFunction = async (req, res) => {
    try {
        const { nome_funcao, descricao, nome_modulo } = req.body;

        // Encontra o módulo pelo nome
        const modulo = await Modulo.findOne({ where: { nome_modulo } });

        if (!modulo) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }

        const newFunction = await Funcao.create({ nome_funcao, descricao, id_modulo: modulo.id_modulo });
        res.status(201).json(newFunction);
    } catch (error) {
        console.error('Erro ao criar função:', error);
        res.status(500).json({ error: 'Erro ao criar função' });
    }
};