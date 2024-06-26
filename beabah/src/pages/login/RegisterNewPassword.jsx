import styles from '../../styles/login/registerNewPassword.module.css'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export function RegisterNewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('As senhas não correspondem');
            return;
        }

        const formData = {
            token,
            newPassword: password
        };

        try {
            const response = await fetch('http://localhost:3000/registerNewPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Senha alterada com sucesso');
                navigate('/login');
            } else {
                console.error('Erro ao alterar senha:', data.message || response.statusText);
                setError(data.message || 'Erro ao alterar senha');
            }
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            setError('Erro ao alterar senha');
        }
    };

    return (
        <div className={styles.body}>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Nova Senha</h1>
                <div className={styles.dados}>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Senha" />
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirme a Senha" />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}