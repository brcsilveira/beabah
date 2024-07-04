import styles from '../../styles/functionManagement/selectModulesF.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SelectModulesF() {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch('http://localhost:3000/modules');
                if (!response.ok) {
                    throw new Error('Erro ao buscar módulos');
                }
                const data = await response.json();
                console.log('Módulos:', data);
                setModules(data);
            } catch (error) {
                setError('Erro ao buscar módulos');
                console.error('Erro ao buscar módulos:', error);
            }
        };

        fetchModules();
    }, []);

    const handleSelect = (moduleId) => {
        navigate(`/createFunction/${moduleId}`);
    };

    if (error) {
        return <div>{error}</div>;
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredModules = modules.filter(modulo =>
        modulo.nome_modulo.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Selecionar Módulo</h1>
            <input
                type="text"
                placeholder="Pesquisar módulo"
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <ul className={styles.listaModulos}>
                {filteredModules.map(modulo => (
                    <li key={modulo.id_modulo} className={styles.itemModulo}>
                        <span className={styles.moduleName}>{modulo.nome_modulo} - {modulo.descricao}</span>
                        <button
                            className={styles.selectButton}
                            onClick={() => handleSelect(modulo.id_modulo)}
                        >
                            Selecionar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}