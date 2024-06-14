const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuarioController = require('./controllers/usuarioController');
const perfilController = require('./controllers/perfilController');
const moduloController = require('./controllers/moduloController');
const funcaoController = require('./controllers/funcaoController');
const transacaoController = require('./controllers/transacaoController');
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
app.post('/profiles/modules', perfilController.associateProfilesToModules);
// Rota para obter os módulos associados a um perfil
app.get('/profiles/:id_perfil/modules', perfilController.getAssociateProfileModules);
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

// Rota para obter todas as funções de um módulo pelo nome do módulo
// app.get('/modules/:moduleName/functions', async (req, res) => {
//     try {
//         const { moduleName } = req.params;
        
//         // Encontra o módulo pelo nome
//         const modulo = await Modulo.findOne({
//             where: { nome_modulo: moduleName },
//             include: [Funcao]
//         });

//         if (!modulo) {
//             return res.status(404).json({ error: 'Módulo não encontrado' });
//         }

//         res.status(200).json(modulo.funcoes);
//     } catch (error) {
//         console.error('Erro ao obter funções do módulo:', error);
//         res.status(500).json({ error: 'Erro ao obter funções do módulo' });
//     }
// });


//Transacao:
// Rota POST para criar uma nova transação
app.post('/transactions', transacaoController.createTransaction);
// Rota GET para obter todas as transações
app.get('/transactions', transacaoController.getTransactions);


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
