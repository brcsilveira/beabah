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

// Rota GET para obter todas as transações
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transacao.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({ error: 'Erro ao obter transações' });
    }
};

// Rota GET para obter uma transação pelo ID
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transacao.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Erro ao obter transação:', error);
        res.status(500).json({ error: 'Erro ao obter transação' });
    }
};

// Rota PUT para atualizar uma transação
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_transacao, descricao } = req.body;
        const transaction = await Transacao.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }
        transaction.nome_transacao = nome_transacao;
        transaction.descricao = descricao;
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        res.status(500).json({ error: 'Erro ao atualizar transação' });
    }
};

// Rota DELETE para deletar uma transação
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transacao.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }
        await transaction.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar transação:', error);
        res.status(500).json({ error: 'Erro ao deletar transação' });
    }
};