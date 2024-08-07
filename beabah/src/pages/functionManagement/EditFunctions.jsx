import styles from '../../styles/functionManagement/editFunctions.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function EditFunctions() {
    const [functions, setFuncions] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFunctions = async () => {
            try {
                const response = await fetch('http://localhost:3000/functions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Functions data:', data);
                setFuncions(data);
            } catch (error) {
                setError('Erro ao buscar funções');
                console.error('Erro ao buscar funções:', error);
            }
        }

        fetchFunctions();
    }, []);

    const handleEdit = (functionId) => {
        navigate(`/editFunction/${functionId}`);
    }

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
            <h1 className={styles.titulo}>Editar Funções</h1>
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
                        <button
                            onClick={() => handleEdit(funcao.id_funcao)}
                            className={styles.editButton}
                        >
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}