import styles from '../../styles/transactionManagement/selectModulesT.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SelectModulesT() {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
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
        navigate(`/assignTransactions/${moduleId}`);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Selecionar Módulo</h1>
            <ul className={styles.listaModulos}>
                {modules.map(module => (
                    <li key={module.id_modulo} className={styles.itemModulo}>
                        <span className={styles.moduleName}>{module.nome_modulo} - {module.descricao}</span>
                        <button
                            className={styles.selectButton}
                            onClick={() => handleSelect(module.id_modulo)}
                        >
                            Selecionar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}