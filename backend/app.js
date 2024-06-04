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
