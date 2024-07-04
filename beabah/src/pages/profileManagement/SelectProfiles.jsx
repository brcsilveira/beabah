import styles from "../../styles/profileManagement/selectProfiles.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SelectProfiles () {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:3000/profiles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Perfis:', data);
                setProfiles(data);
            } catch (error) {
                setError('Erro ao buscar perfis');
                console.error('Erro ao buscar perfis:', error);
            }
        }

        fetchProfiles();
    }, []);

    const handleSelect = (profileId) => {
        navigate(`/associateModules/${profileId}`);
    }

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
            <h1 className={styles.titulo}>Selecionar Perfil</h1>
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
                        <button 
                            onClick={() => handleSelect(profile.id_perfil)}
                            className={styles.selectButton}
                        >
                            Selecionar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}