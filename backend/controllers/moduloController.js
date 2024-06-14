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