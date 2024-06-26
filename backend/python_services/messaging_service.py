from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

@app.route('/send-reset-email', methods=['POST'])
def send_reset_email():
    data = request.get_json()
    email = data['email']
    token = data['token']

    # Configurações do servidor de email
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = os.getenv('SMTP_USERNAME', 'beabah89@gmail.com')
    smtp_password = os.getenv('SMTP_PASSWORD', 'jbhl tkvh uuec khyk')

    # URL de redefinição de senha
    reset_url = f"http://localhost:5173/registerNewPassword?token={token}"

    # Compor o email
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = email # Email do destinatário fornecido pelo usuário
    msg['Subject'] = 'Redefinição de senha'

    body = f"Para redefinir sua senha, clique no link a seguir: {reset_url}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Enviar o email
        print("Tentando conectar ao servidor SMTP...")
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        print("Conectado ao servidor SMTP, tentando logar...")
        server.login(smtp_username, smtp_password)
        print("Logado no servidor SMTP, tentando enviar o email...")
        server.sendmail(smtp_username, email, msg.as_string())
        server.quit()
        print("Email enviado com sucesso!")

        return jsonify({'message': 'Email enviado com sucesso!'}), 200
    except smtplib.SMTPAuthenticationError as e:
        print("Erro de autenticação SMTP:", e)
        return jsonify({'message': 'Falha ao enviar e-mail', 'error': 'Erro de autenticação SMTP'}), 500
    except smtplib.SMTPConnectError as e:
        print("Erro de conexão SMTP:", e)
        return jsonify({'message': 'Falha ao enviar e-mail', 'error': 'Erro de conexão SMTP'}), 500
    except Exception as e:
        print("Erro ao enviar e-mail:", e)
        return jsonify({'message': 'Falha ao enviar e-mail', 'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(port=5001, debug=True)
    