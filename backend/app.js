const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Usuario = require('./models/usuarios'); // Corrigido para importar corretamente
const Funcao = require('./models/funcoes');
const Modulo = require('./models/modulos');
const Perfil = require('./models/perfil');
const Transacao = require('./models/transacoes');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors({ origin: '*' })); // Feito pra acessar de qualquer lugar

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos.
app.use(express.static(path.join(__dirname, 'views')));

// Rota GET para servir o arquivo 'register.html'
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Rota POST para criar um novo usuário
app.post('/users', async (req, res) => {
    try {
        const { nome_usuario, email, senha, id_perfil, codigo } = req.body;
        const newUser = await Usuario.create({ nome_usuario, email, senha, id_perfil, codigo });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Rota POST para criar um novo perfil
app.post('/profiles', async (req, res) => {
    try {
        const { nome_perfil, id_transacao, funcoes } = req.body;
        const newProfile = await Perfil.create({ nome_perfil, id_transacao, funcoes });
        res.status(201).json(newProfile);
    } catch (error) {
        console.error('Erro ao criar perfil:', error);
        res.status(500).json({ error: 'Erro ao criar perfil' });
    }
});

// Rota POST para criar um novo modulo
app.post('/modules', async (req, res) => {
    try {
        const { nome_modulo, descricao, id_funcao } = req.body;
        const newModule = await Modulo.create({ nome_modulo, descricao, id_funcao });
        res.status(201).json(newModule);
    } catch (error) {
        console.error('Erro ao criar modulo:', error);
        res.status(500).json({ error: 'Erro ao criar modulo' });
    }
});

// Rota POST para criar uma nova função
app.post('/functions', async (req, res) => {
    try {
        const { nome_funcao, descricao } = req.body;
        const newFunction = await Funcao.create({ nome_funcao, descricao });
        res.status(201).json(newFunction);
    } catch (error) {
        console.error('Erro ao criar função:', error);
        res.status(500).json({ error: 'Erro ao criar função' });
    }
});

// Rota POST para criar uma nova transação
app.post('/transactions', async (req, res) => {
    try {
        const { nome_transacao, descricao, id_funcao } = req.body;
        const newTransaction = await Transacao.create({ nome_transacao, descricao, id_funcao });
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        res.status(500).json({ error: 'Erro ao criar transação' });
    }
});

// Rota raiz para direcionar para a página de registro
app.get('/', (req, res) => {
    res.redirect('/register');
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Loga o erro no console
    res.status(500).send('Algo deu errado!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
