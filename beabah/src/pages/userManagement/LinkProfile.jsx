import styles from '../../styles/userManagement/linkProfile.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

export function LinkProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState('');
    const navigate = useNavigate();

     useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
                setSelectedProfile(data.id_perfil || '');
            } catch (error) {
                setError('Erro ao buscar usuário');
            }
        };

        fetchUser();
    }, [userId]);

    const handleProfileChange = (event) => {
        setSelectedProfile(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            id_perfil: selectedProfile
        };

        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate('/userManagement', { state: { message: 'Perfil vinculado!' } });
            } else {
                console.error('Erro ao vincular perfil');
            }
        } catch (error) {
            console.error('Erro ao vincular perfil:', error);
        }
    };

    if (error) {
        return <div>{error}</div>
    }

    const isUpdating = !!user.id_perfil;

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>{isUpdating ? 'Alterar Vínculo' : 'Vincular'}</h1>
                <h2 className={styles.nomeUsuario}>{user.nome_usuario}</h2>
                <div className={styles.opcoes}>
                    <label htmlFor="admin"><input type="radio" id='admin' name='perfil' value="1" checked={selectedProfile === '1'} onChange={handleProfileChange}/> Administrador</label>
                    <label htmlFor="comum"><input type="radio" id='comum' name='perfil' value="2" checked={selectedProfile === '2'} onChange={handleProfileChange}/> Comum</label>
                    <label htmlFor="caixaVC"><input type="radio" id='caixaVC' name='perfil' value="3" checked={selectedProfile === '3'} onChange={handleProfileChange}/> Caixa VC</label>
                    <label htmlFor="estabelecimento"><input type="radio" id='estabelecimento' name='perfil' value="4" checked={selectedProfile === '4'} onChange={handleProfileChange}/> Estabelecimento</label>
                    <label htmlFor="gestor"><input type="radio" id='gestor' name='perfil' value="5" checked={selectedProfile === '5'} onChange={handleProfileChange}/> Gestor</label>
                </div>
                <button className={styles.vincular}>{isUpdating ? 'Atualizar' : 'Vincular'}</button>
            </form>
        </main>
    )
}