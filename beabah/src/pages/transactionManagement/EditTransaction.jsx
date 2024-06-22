import styles from "../../styles/transactionManagement/editTransaction.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditTransaction () {
    const navigate = useNavigate();
    const { transactionId } = useParams();
    const [formData, setFormData] = useState({
        nome: "",
        descricao: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/transactions/${transactionId}`);
                if (!response.ok) {
                    throw new Error('Transação não encontrada.');
                }
                const data = await response.json();
                setFormData({
                    nome: data.nome_transacao || '',
                    descricao: data.descricao || ''
                });
            } catch (error) {
                setError('Erro ao buscar transação.');
                console.error('Erro ao buscar transação.', error);
            }
        };

        fetchTransactionData();
    }, [transactionId]);

    const handleNomeChange = (event) => {
        setFormData({
            ...formData,
            nome: event.target.value
        });
    };

    const handledescricaoChange = (event) => {
        setFormData({
            ...formData,
            descricao: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.nome.trim()) {
            setError('Nome é obrigatório.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/transactions/${transactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_transacao: formData.nome,
                    descricao: formData.descricao
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar transação.');
            }

            navigate('/transactionManagement', { state: { message: 'Transação atualizada!' } });
        } catch (error) {
            setError('Erro ao atualizar transação.');
            console.error('Erro ao atualizar transação.', error);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Transação</h1>
                <input type="text" id="nome" name="nome" value={formData.nome} className={styles.nomeTransacao} required placeholder="Nome (Obrigatório)" onChange={handleNomeChange}/>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" value={formData.descricao} placeholder="Opcional" onChange={handledescricaoChange}></textarea>
                </div>
                <button type='submit' className={styles.atualizar}>Atualizar</button>
            </form>
        </main>
    )
}