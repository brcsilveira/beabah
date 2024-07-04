import styles from '../../styles/transactionManagement/deleteTransactions.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalTransaction } from "./ModalTransaction";

export function DeleteTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

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

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        setIsModalOpen(false);
    };

    const handleDeleteTransaction = async () => {
        try {
            const response = await fetch(`http://localhost:3000/transactions/${selectedTransaction.id_transacao}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setTransactions(transactions.filter(transaction => transaction.id_transacao !== selectedTransaction.id_transacao));
                closeModal();
                navigate('/transactionManagement', { state: { message: 'Transação excluída!' } });
            } else {
                console.error('Erro ao excluir transação');
            }
        } catch (error) {
            console.error('Erro ao excluir transação:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.nome_transacao.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Excluir Transação</h1>
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
                            className={styles.deleteButton}
                            onClick={() => openModal(transaction)}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            <ModalTransaction
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDeleteTransaction}
                transaction={selectedTransaction} 
            />
        </div>
    )
}