const Modulo = require('../models/modulos');
const ModuloTransacao = require('../models/modulos_transacoes');

// Rota para obter as transações atribuídas a um módulo
exports.getAssignedTransactions = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const transactions = await ModuloTransacao.findAll({ where: { id_modulo: moduleId } });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao obter transações atribuídas:', error);
        res.status(500).json({ error: 'Erro ao obter transações atribuídas' });
    }
};

// Rota para atribuir transações a um módulo
exports.assignTransactionsToModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { transactions } = req.body;

        // Verificar se o módulo existe
        const modulo = await Modulo.findByPk(moduleId);
        if (!modulo) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }

        // Desassociar todas as transações existentes do módulo
        await ModuloTransacao.destroy({ where: { id_modulo: moduleId } });

        // Associar as novas transações
        if (transactions && transactions.length > 0) {
            const associacoes = transactions.map(transactionId => ({
                id_modulo: moduleId,
                id_transacao: transactionId
            }));
            await ModuloTransacao.bulkCreate(associacoes);
        }

        res.status(200).json({ message: 'Transações atribuídas com sucesso' });
    } catch (error) {
        console.error('Erro ao atribuir transações:', error);
        res.status(500).json({ error: 'Erro ao atribuir transações' });
    }
};

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

// Rota GET para obter todos os módulos
exports.getModules = async (req, res) => {
    try {
        const modules = await Modulo.findAll();
        res.status(200).json(modules);
    } catch (error) {
        console.error('Erro ao obter módulos:', error);
        res.status(500).json({ error: 'Erro ao obter módulos' });
    }
};

// Rota GET para obter um módulo pelo ID
exports.getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await Modulo.findByPk(id);
        if (!module) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }
        res.status(200).json(module);
    } catch (error) {
        console.error('Erro ao obter módulo:', error);
        res.status(500).json({ error: 'Erro ao obter módulo' });
    }
};

// Rota PUT para atualizar um módulo
exports.updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_modulo, descricao} = req.body;
        const module = await Modulo.findByPk(id);
        if (!module) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }
        module.nome_modulo = nome_modulo;
        module.descricao = descricao;
        await module.save();
        res.status(200).json(module);
    } catch (error) {
        console.error('Erro ao atualizar módulo:', error);
        res.status(500).json({ error: 'Erro ao atualizar módulo' });
    }
}

// Rota DELETE para deletar um módulo
exports.deleteModule = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await Modulo.findByPk(id);
        if (!module) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }
        await module.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar módulo:', error);
        res.status(500).json({ error: 'Erro ao deletar módulo' });
    }
}