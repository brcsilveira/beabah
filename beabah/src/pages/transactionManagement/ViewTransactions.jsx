import styles from '../../styles/transactionManagement/viewTransactions.module.css';
import { useState, useEffect } from "react";

export function ViewTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:3000/transactions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar transações');
                }
                const data = await response.json();
                console.log('Transações:', data);
                setTransactions(data);
            } catch (error) {
                setError('Erro ao buscar transações');
                console.error('Erro ao buscar transações:', error);
            }
        };

        fetchTransactions();
    }, []);

    if (error) {
        return <div>{error}</div>;
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.nome_transacao.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Transações</h1>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}