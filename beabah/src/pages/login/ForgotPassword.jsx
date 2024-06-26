import styles from '../../styles/login/forgot-password.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Email enviado com sucesso');
                navigate('/emailSent');
            } else {
                console.error('Erro ao enviar email:', data.message || response.statusText);
                setError(data.message || 'Erro ao enviar email');
            }
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            setError('Erro ao enviar email');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Insira seu E-mail</h1>
                <input type="email" id="email" name="email" className={styles.dados} required placeholder="E-mail" value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit" className="buttonSend">Enviar</button>
            </form>
        </div>
    )
}