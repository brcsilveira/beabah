import styles from "../../styles/profileManagement/selectProfiles.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SelectProfiles () {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchProfiles();
    }, []);

    const handleAssociate = (profileId) => {
        navigate(`/associateModules/${profileId}`);
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Associar Perfil</h1>
            <ul className={styles.listaPerfis}>
                {profiles.map(profile => (
                    <li key={profile.id_perfil} className={styles.itemPerfil}>
                        <span className={styles.profileName}>{profile.nome_perfil}</span>
                        <button 
                            className={styles.associateButton} 
                            onClick={() => handleAssociate(profile.id_perfil)}
                        >
                            Associar
                        </button>  
                    </li>
                ))}
            </ul>
        </div>
    )
}