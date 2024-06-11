const Transacao = require('../models/transacoes');

// Rota POST para criar uma nova transação
exports.createTransaction = async (req, res) => {
    try {
        const { nome_transacao, descricao } = req.body;
        const newTransaction = await Transacao.create({ nome_transacao, descricao });
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        res.status(500).json({ error: 'Erro ao criar transação' });
    }
};