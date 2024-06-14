import styles from "../../styles/profileManagement/viewProfiles.module.css";
import { useEffect, useState } from "react";

export function ViewProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:3000/profiles');
                if (!response.ok) {
                    throw new Error('Erro ao buscar perfis');
                }
                const data = await response.json();
                console.log('Perfis:', data);
                setProfiles(data);
            } catch (error) {
                setError('Erro ao buscar perfis');
                console.error('Erro ao buscar perfis:', error);
            }
        };

        fetchProfiles();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Perfis</h1>
            <ul className={styles.listaPerfis}>
                {profiles.map(profile => (
                    <li key={profile.id_perfil} className={styles.itemPerfil}>
                        <span className={styles.profileName}>{profile.nome_perfil}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}