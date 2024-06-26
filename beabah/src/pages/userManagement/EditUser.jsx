import styles from '../../styles/userManagement/editUser.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export function EditUser () {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nome_usuario: '',
        email: '',
        senha: '',
        confirmaSenha: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(prevState => ({
                    ...prevState,
                    nome_usuario: data.nome_usuario || '',
                    email: data.email || '',
                    senha: '',
                    confirmaSenha: ''
                })
                );
            } catch (error) {
                setError('Erro ao buscar usuário');
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.senha !== user.confirmaSenha) {
            setError('Senhas não conferem');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_usuario: user.nome_usuario,
                    email: user.email,
                    senha: user.senha
                })
            });

            if (response.ok) {
                navigate('/userManagement', { state: { message: 'Usuário atualizado!' } });
            } else {
                console.error('Erro ao atualizar usuário');
            }
        } catch (error) {
            setError('Erro ao atualizar usuário');
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Usuário</h1>
                <h2 className={styles.nomeUsuario}>{user.nome_usuario}</h2>
                <div className={styles.dados}>
                    <input type="text" id="nome" name="nome_usuario" required placeholder="Alterar Nome" value={user.nome_usuario} onChange={handleChange} />
                    <input type="email" id="email" name="email" required placeholder="Alterar E-mail" value={user.email} onChange={handleChange} />
                    <input type="password" id="senha" name="senha" required placeholder="Alterar Senha" value={user.senha} onChange={handleChange} />
                    <input type="password" id="confirmaSenha" name="confirmaSenha" required placeholder="Confirme a Nova Senha" value={user.confirmaSenha} onChange={handleChange} />
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <button type='submit' className={styles.atualizar}>Atualizar</button>
            </form>      
        </main>
    )
}