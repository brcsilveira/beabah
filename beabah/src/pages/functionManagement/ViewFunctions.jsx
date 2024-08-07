import styles from '../../styles/functionManagement/viewFunctions.module.css';
import { useState, useEffect } from "react";

export function ViewFunctions() {
    const [functions, setFuncions] = useState([]);
    const [error, setError] = useState(null);
    const [modules, setModules] = useState({});
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchFunctions = async () => {
            try {
                const response = await fetch('http://localhost:3000/functions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFuncions(data);
                
                const moduleIds = [...new Set(data.map(func => func.id_modulo))];
                const modulePromises = moduleIds.map(id => fetch(`http://localhost:3000/modules/${id}`));
                const moduleResponses = await Promise.all(modulePromises);

                const modulesData = await Promise.all(moduleResponses.map(response => response.json()));
                const modulesMap = modulesData.reduce((acc, module) => {
                    acc[module.id_modulo] = module;
                    return acc;
                }, {});

                setModules(modulesMap);
            } catch (error) {
                setError('Erro ao buscar funções');
                console.error('Erro ao buscar funções:', error);
            }
        }

        fetchFunctions();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredFunctions = functions.filter(funcao =>
        funcao.nome_funcao.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Funções</h1>
            <input
                type="text"
                placeholder="Pesquisar função"
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <ul className={styles.listaFuncoes}>
                {filteredFunctions.map(funcao => (
                    <li key={funcao.id_funcao} className={styles.itemFuncao}>
                        <span className={styles.functionName}>{funcao.nome_funcao} - {funcao.descricao}</span>
                        <span className={styles.moduleName}>{modules[funcao.id_modulo]?.nome_modulo}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}