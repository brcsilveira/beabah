const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const Usuario = require('./models/usuarios'); // Corrigido para importar corretamente
// const Funcao = require('./models/funcoes');
// const Modulo = require('./models/modulos');
// const Perfil = require('./models/perfil');
// const Transacao = require('./models/transacoes');
const usuarioController = require('./controllers/usuarioController');
const perfilController = require('./controllers/perfilController');
const moduloController = require('./controllers/moduloController');
const funcaoController = require('./controllers/funcaoController');
const transacaoController = require('./controllers/transacaoController');
const app = express();
const PORT = 3000;


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

//Modulo:
// Rota POST para criar um novo modulo
app.post('/modules', moduloController.createModule);


//Funcao:
// Rota POST para criar uma nova função
app.post('/functions', funcaoController.createFunction);
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
