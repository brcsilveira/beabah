import styles from '../../styles/transactionManagement/assignTransactions.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export function AssignTransactions() {
    const { moduleId } = useParams();
    const [module, setModule] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [selectedTransactions, setSelectedTransactions] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`http://localhost:3000/transactions`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar as transações.');
                }
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                setError('Ocorreu um erro ao buscar as transações.');
            }
        };

        const fetchModule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/modules/${moduleId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar o módulo.');
                }
                const data = await response.json();
                setModule(data);
                // Fetch assigned transactions for the module
                const assignedResponse = await fetch(`http://localhost:3000/modules/${moduleId}/transactions`);
                if (!assignedResponse.ok) {
                    throw new Error('Erro ao buscar as transações atribuídas.');
                }
                const assignedData = await assignedResponse.json();
                setSelectedTransactions(new Set(assignedData.map(trans => trans.id_transacao)));
            } catch (error) {
                setError('Ocorreu um erro ao buscar o módulo.');
            }
        };

        fetchTransactions();
        fetchModule();
    }, [moduleId]);

    const handleCheckboxChange = (transactionId) => {
        setSelectedTransactions(prev => {
            const updated = new Set(prev);
            if (updated.has(transactionId)) {
                updated.delete(transactionId);
            } else {
                updated.add(transactionId);
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/modules/${moduleId}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transactions: Array.from(selectedTransactions) })
            });
            if (!response.ok) {
                throw new Error('Erro ao atribuir as transações ao módulo.');
            }
            navigate('/transactionManagement', { state: { message: 'Transações atribuídas com sucesso!' } });
        } catch (error) {
            setError('Erro ao atribuir as transações ao módulo.');
        }
    };
    
    return (
        <main>
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <h1 className={styles.titulo}>Atribuir Transações</h1>
                <h2 className={styles.nomeModulo}>{module.nome_modulo} - {module.descricao}</h2>
                {error && <p className={styles.erro}>{error}</p>}
                <div className={styles.opcoes}>
                    {transactions && transactions.length > 0 ? (
                        transactions.map(transaction => (
                            transaction && transaction.id_transacao && (
                                <label key={transaction.id_transacao} htmlFor={`transaction${transaction.id_transacao}`}>
                                    <input
                                        type="checkbox"
                                        id={`transaction${transaction.id_transacao}`}
                                        name='transacao'
                                        value={transaction.id_transacao.toString()}
                                        checked={selectedTransactions.has(transaction.id_transacao)}
                                        onChange={() => handleCheckboxChange(transaction.id_transacao)}
                                    />
                                    {transaction.nome_transacao} - {transaction.descricao}
                                </label>
                            )
                        ))
                    ) : (
                            <p>Nenhuma transação encontrada.</p>
                    )}
                </div>
                <button className={styles.atribuir} type="submit">Atribuir</button>
            </form>
        </main>
    );
}
