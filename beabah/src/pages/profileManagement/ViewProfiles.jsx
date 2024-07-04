import styles from "../../styles/profileManagement/viewProfiles.module.css";
import { useEffect, useState } from "react";

export function ViewProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

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

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.nome_perfil.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Perfis</h1>
            <input
                type="text"
                placeholder="Pesquisar perfil"
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <ul className={styles.listaPerfis}>
                {filteredProfiles.map(profile => (
                    <li key={profile.id_perfil} className={styles.itemPerfil}>
                        <span className={styles.profileName}>{profile.nome_perfil}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}