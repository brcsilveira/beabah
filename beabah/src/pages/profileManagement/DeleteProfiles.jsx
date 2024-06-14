import styles from "../../styles/profileManagement/deleteProfiles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalProfile } from "./ModalProfile";

export function DeleteProfiles () {
    const [profiles, setProfiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
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

    const openModal = (profile) => {
        setSelectedProfile(profile);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProfile(null);
        setIsModalOpen(false);
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3000/profiles/${selectedProfile.id_perfil}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProfiles(profiles.filter(profile => profile.id_perfil !== selectedProfile.id_perfil));
                closeModal();
                navigate('/profileManagement', { state: { message: 'Perfil excluído!' } });
            } else {
                console.error('Erro ao excluir perfil');
            }
        } catch (error) {
            console.error('Erro ao excluir perfil:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Excluir Perfil</h1>
            <ul className={styles.listaPerfis}>
                {profiles.map(profile => (
                    <li key={profile.id_perfil} className={styles.itemPerfil}>
                        <span className={styles.profileName}>{profile.nome_perfil}</span>
                        <button 
                            className={styles.deleteButton} 
                            onClick={() => openModal(profile)}
                        >
                            Excluir
                        </button>  
                    </li>
                ))}
            </ul>
            <ModalProfile 
                isOpen={isModalOpen}
                // onRequestClose={closeModal}
                // onConfirm={handleDeleteProfile}
                // title="Excluir Perfil"
                // message={`Deseja realmente excluir o perfil ${selectedProfile?.nome_perfil}?`}
                // confirmText="Excluir"
                // cancelText="Cancelar"
                onClose={closeModal}
                onConfirm={handleDeleteProfile}
                profile={selectedProfile}
            />
        </div>
    )
}