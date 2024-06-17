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

// Rota GET para obter uma função pelo ID
exports.getFunctionById = async (req, res) => {
    try {
        const { id } = req.params;
        const funcao = await Funcao.findByPk(id);

        if (!funcao) {
            return res.status(404).json({ error: 'Função não encontrada' });
        }

        res.status(200).json(funcao);
    } catch (error) {
        console.error('Erro ao obter função:', error);
        res.status(500).json({ error: 'Erro ao obter função' });
    }
};

// Rota PUT para atualizar uma função
exports.updateFunction = async (req, res) => {
    const { id } = req.params;
    const { nome_funcao, descricao, id_modulo } = req.body;

    try {
        // Verifica se o ID da função é válido
        if (!id) {
            return res.status(400).json({ error: 'ID da função não fornecido' });
        }

        // Busca a função pelo ID
        const funcao = await Funcao.findByPk(id);
        if (!funcao) {
            return res.status(404).json({ error: 'Função não encontrada' });
        }

        // Verifica se o módulo informado existe
        const modulo = await Modulo.findByPk(id_modulo);
        if (!modulo) {
            return res.status(404).json({ error: 'Módulo não encontrado' });
        }

        // Atualiza os dados da função
        funcao.nome_funcao = nome_funcao;
        funcao.descricao = descricao;
        funcao.id_modulo = id_modulo;

        // Salva as alterações no banco de dados
        await funcao.save();

        // Retorna a função atualizada como resposta
        res.status(200).json(funcao);
    } catch (error) {
        console.error('Erro ao atualizar função:', error);
        res.status(500).json({ error: 'Erro ao atualizar função' });
    }
};
