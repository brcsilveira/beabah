import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/profileManagement/createProfilesTF.module.css";

export function CreateProfilesTF () {
    const navigate = useNavigate();

    // Estado para armazenar as seleções do formulário
    const [formData, setFormData] = useState({
        nome: '',
        transacao: '',
        funcoes: []
    });

    const [transacoes, setTransacoes] = useState([]);
    const [funcoes, setFuncoes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const response = await fetch('http://localhost:3000/transactions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar transações');
                }
                const data = await response.json();
                console.log('Transações:', data);
                setTransacoes(data);
            } catch (error) {
                setError('Erro ao buscar transações');
                console.error('Erro ao buscar transações:', error);
            }
        };

        const fetchFuncoes = async () => {
            try {
                const response = await fetch('http://localhost:3000/functions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar funções');
                }
                const data = await response.json();
                console.log('Funções:', data);
                setFuncoes(data);
            } catch (error) {
                setError('Erro ao buscar funções');
                console.error('Erro ao buscar funções:', error);
            }
        };

        fetchTransacoes();
        fetchFuncoes();
    }, []);

    // Função para atualizar o estado quando o nome é digitado
    const handleNomeChange = (event) => {
        setFormData({
            ...formData,
            nome: event.target.value
        });
    };

    // Função para atualizar o estado quando uma transação é selecionada
    const handleTransacaoChange = (event) => {
        setFormData({
            ...formData,
            transacao: event.target.value
        });
    };

    // Função para atualizar o estado quando uma função é selecionada/deselecionada
    const handleFuncaoChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFormData({
                ...formData,
                funcoes: [...formData.funcoes, value]
            });
        } else {
            setFormData({
                ...formData,
                funcoes: formData.funcoes.filter(funcao => funcao !== value)
            });
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Faz a requisição POST para o backend
            const response = await fetch('http://localhost:3000/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_perfil: formData.nome, 
                    id_transacao: formData.transacao,
                    funcoes: formData.funcoes
                })
            });
            // Verifica se a requisição foi bem sucedida
            if (response.ok) {
                navigate('/profileManagement', { state: { message: 'Perfil criado!' } });
            } else {
                console.error('Erro ao criar perfil:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao criar perfil:', error);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Criar Perfil</h1>
                <input type="text" id="nome" name="nome" value={formData.nome} className={styles.nome} required placeholder="Nome (Obrigatório)" onChange={handleNomeChange} />
                <h2>Transações</h2>
                <div className={styles.opcoes}>
                    {transacoes && transacoes.length > 0 ? (
                        transacoes.map(transacao => (
                            <label key={transacao.id_transacao} htmlFor={`transacao${transacao.id_transacao}`}>
                                <input
                                    type="radio"
                                    id={`transacao${transacao.id_transacao}`}
                                    name='transacao'
                                    value={transacao.id_transacao.toString()}
                                    onChange={handleTransacaoChange} />
                                    {`${transacao.nome_transacao} - ${transacao.descricao}`}
                            </label>
                        )    
                    )) : (
                        <p>Nenhuma transação encontrada.</p>
                    )}
                </div>
                <h2>Funções</h2>
                <div className={styles.opcoes}>
                    {funcoes && funcoes.length > 0 ? (
                        funcoes.map(funcao => (
                            <label key={funcao.id_funcao} htmlFor={`funcao${funcao.id_funcao}`}>
                                <input
                                    type="checkbox"
                                    id={`funcao${funcao.id_funcao}`}
                                    name='funcao'
                                    value={funcao.id_funcao.toString()}
                                    onChange={handleFuncaoChange} />
                                    {`${funcao.nome_funcao} - ${funcao.descricao}`}
                            </label>
                        )    
                    )) : (
                        <p>Nenhuma função encontrada.</p>
                    )}  
                </div>
                <button type="submit" className={styles.criar}>Criar</button>
            </form>
        </main>
    )
}