const Modulo = require('../models/modulos');

// Rota POST para criar um novo modulo
exports.createModule = async (req, res) => {
    try {
        const { nome_modulo, descricao, id_funcao } = req.body;
        const newModule = await Modulo.create({ nome_modulo, descricao, id_funcao });
        res.status(201).json(newModule);
    } catch (error) {
        console.error('Erro ao criar modulo:', error);
        res.status(500).json({ error: 'Erro ao criar modulo' });
    }
}