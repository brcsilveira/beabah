import styles from "../../styles/profileManagement/selectProfiles.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SelectProfiles () {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfilesWithModules = async () => {
            try {
                const response = await fetch('http://localhost:3000/profiles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const profilesData = await response.json();
                console.log('Profiles data:', profilesData);

                // Fetch modules associated with each profile
                const profilesWithModules = await Promise.all(profilesData.map(async (profile) => {
                    const hasModules = await fetchProfileModules(profile.id_perfil);
                    return { ...profile, hasModules };
                }));

                setProfiles(profilesWithModules);
            } catch (error) {
                setError('Erro ao buscar perfis');
                console.error('Erro ao buscar perfis:', error);
            }
        }

        fetchProfilesWithModules();
    }, []);

    const fetchProfileModules = async (profileId) => {
        try {
            const response = await fetch(`http://localhost:3000/profiles/${profileId}/modules`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Modulos associados ao perfil:', data);
            return data.length > 0; // Retorna true se há módulos associados, false caso contrário
        } catch (error) {
            setError('Erro ao buscar módulos associados ao perfil');
            console.error('Erro ao buscar módulos associados ao perfil:', error);
            return false;
        }
    }

    const handleAssociate = (profileId) => {
        navigate(`/associateModules/${profileId}`);
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Selecionar Perfil</h1>
            <ul className={styles.listaPerfis}>
                {profiles.map(profile => (
                    <li key={profile.id_perfil} className={styles.itemPerfil}>
                        <span className={styles.profileName}>{profile.nome_perfil}</span>
                        <button 
                            className={styles.selectButton} 
                            onClick={() => handleAssociate(profile.id_perfil)}
                            disabled={profile.hasModules}
                            style={{ 
                                backgroundColor: profile.hasModules ? 'gray' : '' 
                            }}
                        >
                            {profile.hasModules ? 'Associado' : 'Selecionar'}
                        </button>  
                    </li>
                ))}
            </ul>
        </div>
    )
}