import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/login/login.module.css'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    console.log('Auth:', auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.login(user, password);
            // Redirecionar para userManagement após login bem-sucedido
            navigate('/dashboard');
        } catch (error) {
            setError('Usuário ou senha incorretos');
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        if (error) {
            setError('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Login</h1>
                <div className={styles.dados}>
                    <input type="text" className={styles.usuario} id='user' name='user' value={user} onChange={handleInputChange(setUser)} required placeholder='Usuário'/>
                    <input type="password" className={styles.senha} id='password' name='password' value={password} onChange={handleInputChange(setPassword)} required placeholder='Senha'/>
                </div>
                <p className={`${styles.error} ${error ? styles.visible : ''}`}>{error}</p>
                <button type="submit" className='buttonLogin'>Entrar</button>
                <Link to="/forgot-password" className={styles.esqueceSenha}>Esqueceu sua senha?</Link>
            </form>
        </div>
    )
}