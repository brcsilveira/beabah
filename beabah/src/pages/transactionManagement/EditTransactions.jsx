import styles from '../../styles/transactionManagement/editTransactions.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function EditTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:3000/transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleEdit = (transactionId) => {
        navigate(`/editTransaction/${transactionId}`);
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.nome_transacao.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Editar Transações</h1>
            <input
                type="text"
                placeholder="Pesquisar transação"
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <ul className={styles.listaTransacoes}>
                {filteredTransactions.map(transaction => (
                    <li key={transaction.id_transacao} className={styles.itemTransacao}>
                        <span className={styles.transactionName}>{transaction.nome_transacao} - {transaction.descricao}</span>
                        <button
                            className={styles.editButton}
                            onClick={() => handleEdit(transaction.id_transacao)}
                        >
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}