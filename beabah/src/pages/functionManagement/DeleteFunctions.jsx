import styles from '../../styles/functionManagement/deleteFunctions.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalFunction } from "./ModalFunction";

export function DeleteFunctions() {
    const [functions, setFunctions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFunctions = async () => {
            try {
                const response = await fetch('http://localhost:3000/functions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar funções');
                }
                const data = await response.json();
                console.log('Funções:', data);
                setFunctions(data);
            } catch (error) {
                setError('Erro ao buscar funções');
                console.error('Erro ao buscar funções:', error);
            }
        };

        fetchFunctions();
    }, []);

    const openModal = (funcao) => {
        setSelectedFunction(funcao);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedFunction(null);
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        if (selectedFunction && selectedFunction.id_funcao) {
            try {
                const response = await fetch(`http://localhost:3000/functions/${selectedFunction.id_funcao}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setFunctions(functions.filter(funcao => funcao.id_funcao !== selectedFunction.id_funcao));
                    closeModal();
                    navigate('/functionManagement', { state: { message: 'Função excluída!' } });
                } else {
                    console.error('Erro ao excluir função');
                }
            } catch (error) {
                console.error('Erro ao excluir função:', error);
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredFunctions = functions.filter(funcao =>
        funcao.nome_funcao.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Excluir Funções</h1>
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
                            onClick={() => openModal(funcao)}
                            className={styles.deleteButton}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            <ModalFunction
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
                func={selectedFunction}
            />
        </div>
    )
}