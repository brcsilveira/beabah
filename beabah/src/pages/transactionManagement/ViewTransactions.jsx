import styles from '../../styles/transactionManagement/viewTransactions.module.css';
import { useState, useEffect } from "react";

export function ViewTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Transações</h1>
            <ul className={styles.listaTransacoes}>
                {transactions.map(transaction => (
                    <li key={transaction.id_transacao} className={styles.itemTransacao}>
                        <span className={styles.transactionName}>{transaction.nome_transacao} - {transaction.descricao}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}