import styles from "../../styles/profileManagement/associateModules.module.css"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function AssociateModules () {
    const { profileId } = useParams();
    const [profile, setProfile] = useState({});
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [selectedModules, setSelectedModules] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar perfil.');
                }
                const data = await response.json();
                setProfile(data);
                // Fetch associated modules for the profile
                const associatedResponse = await fetch(`http://localhost:3000/profiles/${profileId}/modules`);
                if (!associatedResponse.ok) {
                    throw new Error('Erro ao buscar os módulos associados.');
                }
                const associatedData = await associatedResponse.json();
                setSelectedModules(new Set(associatedData.map(mod => mod.id_modulo)));
            } catch (error) {
                setError('Erro ao buscar perfil.');
            }
        }

        const fetchModules = async () => {
            try {
                const response = await fetch('http://localhost:3000/modules');
                if (!response.ok) {
                    throw new Error('Erro ao buscar módulos');
                }
                const data = await response.json();
                setModules(data);
            } catch (error) {
                setError('Erro ao buscar módulos');
            }
        }

        fetchModules();
        fetchProfile();
    }, [profileId]);

    const handleCheckboxChange = (moduleId) => {
        setSelectedModules(prev => {
            const updated = new Set(prev);
            if (updated.has(moduleId)) {
                updated.delete(moduleId);
            } else {
                updated.add(moduleId);
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/profiles/${profileId}/modules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ modules: Array.from(selectedModules) })
            });
            if (!response.ok) {
                throw new Error('Erro ao associar módulos');
            }
            navigate('/profileManagement', { state: { message: 'Módulos associados com sucesso' } });
        } catch (error) {
            setError('Erro ao associar módulos');
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
            <h1 className={styles.titulo}>Associar Módulos</h1>
            <h2 className={styles.nomePerfil}>{profile.nome_perfil}</h2>
            {error && <p className={styles.erro}>{error}</p>}
            <div className={styles.opcoes}>
                {modules && modules.length > 0 ? (
                    modules.map(module => (
                        module && module.id_modulo && (
                            <label key={module.id_modulo} htmlFor={`module${module.id_modulo}`}>
                                <input
                                    type="checkbox"
                                    id={`module${module.id_modulo}`}
                                    name='modulo'
                                    value={module.id_modulo.toString()}
                                    checked={selectedModules.has(module.id_modulo)}
                                    onChange={() => handleCheckboxChange(module.id_modulo)}
                                />
                                {module.nome_modulo} - {module.descricao}
                            </label>
                        )
                    ))
                ) : (
                        <p>Nenhum módulo disponível</p>
                )}
            </div>
            <button type="submit" className={styles.associar}>Associar</button>
            </form>
        </main>
    )
}