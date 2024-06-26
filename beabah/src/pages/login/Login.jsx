import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/login/login.module.css'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    console.log('Auth:', auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulação de lógica de autenticação
        console.log('User:', user);
        console.log('Password:', password);
        await auth.login(user, password);
        // Redirecionar para userManagement após login bem-sucedido
        navigate('/userManagement');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Login</h1>
                <div className={styles.dados}>
                    <input type="text" id='user' name='user' value={user} onChange={(e) => setUser(e.target.value)} required placeholder='Usuário'/>
                    <input type="password" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Senha'/>
                </div>
                <button type="submit" className='buttonLogin'>Entrar</button>
                <Link to="/forgot-password" className={styles.esqueceSenha}>Esqueceu sua senha?</Link>
            </form>
        </div>
    )
}