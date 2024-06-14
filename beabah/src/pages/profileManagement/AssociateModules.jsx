import styles from "../../styles/profileManagement/associateModules.module.css"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function AssociateModules () {
    const { profileId } = useParams();
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [modulos, setModulos] = useState([]);
    const [selectedModules, setSelectedModules] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Profile data:', data); // Adiciona log para verificar a resposta da API
                setProfile(data);
            } catch (error) {
                setError('Erro ao buscar perfil');
                console.error('Erro ao buscar perfil:', error); // Adiciona log para erros
            }
        }

        const fetchModulos = async () => {
            try {
                const response = await fetch('http://localhost:3000/modules');
                if (!response.ok) {
                    throw new Error('Erro ao buscar módulos');
                }
                const data = await response.json();
                console.log('Módulos:', data);
                setModulos(data);
            } catch (error) {
                setError('Erro ao buscar módulos');
                console.error('Erro ao buscar módulos:', error);
            }
        }

        fetchModulos();
        fetchProfile();
    }, [profileId]);

    const handleModuloChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedModules([...selectedModules, parseInt(value)]);
        } else {
            setSelectedModules(selectedModules.filter(id => id !== parseInt(value)));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/profiles/modules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_perfil: parseInt(profileId),
                    id_modulos: selectedModules
                })
            });
            if (!response.ok) {
                throw new Error('Erro ao associar módulos');
            }
            navigate('/profileManagement', { state: { message: 'Módulos associados com sucesso' } });
        } catch (error) {
            console.error('Erro ao associar módulos:', error);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
            <h1 className={styles.titulo}>Associar</h1>
            <h2 className={styles.nomePerfil}>{profile.nome_perfil}</h2>
            <div className={styles.opcoes}>
                {modulos && modulos.length > 0 ? (
                    modulos.map(modulo => (
                        <label key={modulo.id_modulo} htmlFor={` modulo${modulo.id_modulo}`}>
                            <input type="checkbox" 
                            id={`modulo${modulo.id_modulo}`}
                            name="modulo"
                            value={modulo.id_modulo.toString()} 
                            onChange={handleModuloChange}/>
                            {`${modulo.nome_modulo} - ${modulo.descricao}`}
                        </label>
                    )
                )) : (
                    <p>Nenhum módulo encontrado.</p>
                )}
            </div>
            <button type="submit" className={styles.associar}>Associar</button>
            </form>
        </main>
    )
}