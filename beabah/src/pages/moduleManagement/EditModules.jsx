import styles from '../../styles/moduleManagement/editModules.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function EditModules() {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch('http://localhost:3000/modules');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Modules data:', data);
                setModules(data);
            } catch (error) {
                setError('Erro ao buscar módulos');
                console.error('Erro ao buscar módulos:', error);
            }
        }

        fetchModules();
    }, []);

    const handleEdit = (moduleId) => {
        navigate(`/editModule/${moduleId}`);
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredModules = modules.filter(module =>
        module.nome_modulo.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Editar Módulo</h1>
            <input
                type="text"
                placeholder="Pesquisar módulo"
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <ul className={styles.listaModulos}>
                {filteredModules.map(module => (
                    <li key={module.id_modulo} className={styles.itemModulo}>
                        <span className={styles.moduleName}>{module.nome_modulo} - {module.descricao}</span>
                        <button
                            className={styles.editButton}
                            onClick={() => handleEdit(module.id_modulo)}
                        >
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}