const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuarioController = require('./controllers/usuarioController');
const perfilController = require('./controllers/perfilController');
const moduloController = require('./controllers/moduloController');
const funcaoController = require('./controllers/funcaoController');
const transacaoController = require('./controllers/transacaoController');
const passwordController = require('./controllers/passwordController');
const reportController = require('./controllers/reportController');
const dashboardController = require('./controllers/dashboardController');
const jwt = require('jsonwebtoken')
const app = express();
const PORT = 3000;

// Define associações
require('./models/associacoes');

app.use(cors({ origin: '*' })); // Feito pra acessar de qualquer lugar

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos.
app.use(express.static(path.join(__dirname, 'views')));

// Rota GET para servir o arquivo 'register.html'
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Middleware de autenticação JWT
const secret = 'patera88';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'Token não fornecido' });
    }
}

// Rota para login de usuário
app.post('/login', usuarioController.login);

// Use este middleware nas rotas que você deseja proteger
// app.use(authenticateJWT);

//Usuário:
// Rota POST para criar um novo usuário
app.post('/users', usuarioController.createUser);
// Rota DELETE para deletar um usuário
app.delete('/users/:id', usuarioController.deleteUser);
// Rota GET para obter todos os usuários
app.get('/users', usuarioController.getUsers);
// Rota GET para obter um usuário pelo ID
app.get('/users/:id', usuarioController.getUserById);
// Rota PUT para atualizar um usuário
app.put('/users/:id', usuarioController.updateUser);
// Rota PUT para atualizar o perfil de um usuário
app.put('/users/:id/profile', usuarioController.updateProfile);

//Perfil:
// Rota POST para criar um novo perfil
app.post('/profiles', perfilController.createProfile);
// Rota GET para obter todos os perfis
app.get('/profiles', perfilController.getProfiles);
// Rota GET para obter os detalhes de um perfil pelo ID
app.get('/profiles/:id', perfilController.getProfileById);
// Rota PUT para atualizar um perfil
app.put('/profiles/:id', perfilController.updateProfile);
// Rota para associar um Perfil a Módulos
app.post('/profiles/:profileId/modules', perfilController.associateModulesToProfile);
// Rota para obter os módulos associados a um perfil
app.get('/profiles/:profileId/modules', perfilController.getAssociateModules);
// Rota DELETE para excluir um perfil
app.delete('/profiles/:id', perfilController.deleteProfile);

//Modulo:
// Rota POST para criar um novo modulo
app.post('/modules', moduloController.createModule);
// Rota GET para obter todos os módulos
app.get('/modules', moduloController.getModules);
// Rota GET para obter um módulo pelo ID
app.get('/modules/:id', moduloController.getModuleById);
// Rota PUT para atualizar um módulo
app.put('/modules/:id', moduloController.updateModule);
// Rota DELETE para deletar um módulo
app.delete('/modules/:id', moduloController.deleteModule);


//Funcao:
// Rota POST para criar uma nova função
app.post('/functions', funcaoController.createFunction);
// Rota GET para obter todas as funções
app.get('/functions', funcaoController.getFunctions);
// Rota GET para obter uma função pelo ID
app.get('/functions/:id', funcaoController.getFunctionById);
// Rota PUT para atualizar uma função
app.put('/functions/:id', funcaoController.updateFunction);
// Rota DELETE para deletar uma função
app.delete('/functions/:id', funcaoController.deleteFunction);

//Transacao:
// Rota POST para criar uma nova transação
app.post('/transactions', transacaoController.createTransaction);
// Rota GET para obter todas as transações
app.get('/transactions', transacaoController.getTransactions);
// Rota GET para obter uma transação pelo ID
app.get('/transactions/:id', transacaoController.getTransactionById);
// Rota PUT para atualizar uma transação
app.put('/transactions/:id', transacaoController.updateTransaction);
// Rota DELETE para deletar uma transação
app.delete('/transactions/:id', transacaoController.deleteTransaction);
// Rota para atribuir transações a um módulo
app.post('/modules/:moduleId/transactions', moduloController.assignTransactionsToModule);
// Rota para obter as transações atribuídas a um módulo
app.get('/modules/:moduleId/transactions', moduloController.getAssignedTransactions);

// Rota para recuperação de senha
app.post('/forgot-password', passwordController.forgotPassword);

// Rota para redefinição de senha
app.post('/registerNewPassword', passwordController.resetPassword);

// Rota para geração de relatórios
app.post('/generateReports', reportController.generateReports);

// Rota para obter os dados do dashboard
app.get('/dashboardData', dashboardController.getDashboardData);

// Rota raiz para direcionar para a página de registro
app.get('/', (req, res) => {
    res.redirect('/register');
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Loga o erro no console
    res.status(500).json({ error: 'Algo deu errado!', details: err.message });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
