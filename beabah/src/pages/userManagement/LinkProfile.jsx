import styles from '../../styles/userManagement/linkProfile.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

export function LinkProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [profiles, setProfiles] = useState([]); // [1, 2, 3, 4, 5
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
                console.log('User data:', data);
                setUser(data);
                setSelectedProfile(data.id_perfil ? data.id_perfil.toString() : '');
            } catch (error) {
                setError('Erro ao buscar usuário');
                console.error('Erro ao buscar usuário:', error);
            }
        };

        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:3000/profiles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Profiles data:', data); // Adiciona log para verificar a resposta da API
                setProfiles(data);
            } catch (error) {
                setError('Erro ao buscar perfis');
                console.error('Erro ao buscar perfis:', error); // Adiciona log para erros
            }
        }

        fetchUser();
        fetchProfiles();
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
                    {profiles && profiles.length > 0 ? (
                        profiles.map(profile => (
                            profile && profile.id_perfil && (
                                <label key={profile.id_perfil} htmlFor={`profile${profile.id_perfil}`}>
                                    <input
                                        type="radio"
                                        id={`profile${profile.id_perfil}`}
                                        name='perfil'
                                        value={profile.id_perfil.toString()}
                                        checked={selectedProfile === profile.id_perfil.toString()}
                                        onChange={handleProfileChange} />
                                    {profile.nome_perfil}
                                </label>
                            )
                        ))
                    ) : (
                        <p>Nenhum perfil encontrado.</p>
                    )}
                </div>
                <button className={styles.vincular}>{isUpdating ? 'Atualizar' : 'Vincular'}</button>
            </form>
        </main>
    )
}