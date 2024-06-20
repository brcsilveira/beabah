import styles from "../../styles/userManagement/viewUsers.module.css";
import { useEffect, useState } from "react";

export function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json();
                setUsers(data);

                const profileIds = data.map(user => user.id_perfil);
                const profilesData =await Promise.all(profileIds.map(id => fetchProfile(id)));
                const profilesMap = {};
                profilesData.forEach(profile => {
                    profilesMap[profile.id_perfil] = profile.nome_perfil;
                });
                setProfiles(profilesMap);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

    // Função para buscar detalhes do perfil pelo ID
    const fetchProfile = async (profileId) => {
        if (profileId === null || profileId === undefined) {
            return {};
        }
        const response = await fetch(`http://localhost:3000/profiles/${profileId}`);
        const data = await response.json();
        return data;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Usuários</h1>
            <ul className={styles.listaUsuarios}>
                {users.map(user => (
                    <li key={user.id_usuario}>
                    <span className={styles.userName}>{user.nome_usuario}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                    <span className={styles.userId}>{profiles[user.id_perfil]}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}