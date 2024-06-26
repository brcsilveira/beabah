const http = require('http');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'pantera88';  // Defina seu segredo JWT aqui

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email não fornecido' });
    }

    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Cria um token de redefinição de senha
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        // Dados a serem enviados ao serviço de mensageria
        const data = JSON.stringify({
            email,
            token
        });

        // Opções para a solicitação HTTP
        const options = {
            hostname: 'localhost',
            port: 5001,
            path: '/send-reset-email',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        // Cria a solicitação HTTP
        const request = http.request(options, (response) => {
            let responseData = '';

            response.on('data', (chunk) => {
                responseData += chunk;
            });

            response.on('end', () => {
                if (response.statusCode === 200) {
                    res.status(200).json({ message: 'Email de redefinição de senha enviado' });
                } else {
                    res.status(response.statusCode).json({ message: 'Erro ao enviar email de redefinição de senha' });
                }
            });
        });

        request.on('error', (error) => {
            console.error('Erro ao processar a solicitação:', error);
            res.status(500).json({ error: 'Erro ao processar a solicitação' });
        });

        // Envia os dados
        request.write(data);
        request.end();
    } catch (error) {
        console.error('Erro ao processar solicitação:', error);
        res.status(500).json({ error: 'Erro ao processar solicitação' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        user.senha = newPassword;
        console.log('Nova senha:', user.senha);
        await user.save();

        res.status(200).json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        res.status(400).json({ message: 'Token inválido ou expirado' });
    }
};
