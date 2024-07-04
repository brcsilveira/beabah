import styles from "../../styles/moduleManagement/viewModules.module.css";
import { useState, useEffect } from "react";

export function ViewModules() {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

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

    if (error) {
        return <div>{error}</div>;
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredModules = modules.filter(module =>
        module.nome_modulo.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Módulos</h1>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}