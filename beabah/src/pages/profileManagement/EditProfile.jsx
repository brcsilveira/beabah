import styles from "../../styles/profileManagement/editProfile.module.css"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditProfile() {
    const navigate = useNavigate();
    const { profileId } = useParams();

    const [formData, setFormData] = useState({
        nome: "",
        transacao: "",
        funcoes: []
    });

    const [transacoes, setTransacoes] = useState([]);
    const [funcoes, setFuncoes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Perfil não encontrado.');
                }
                const data = await response.json();
                setFormData({
                    nome: data.nome_perfil || '',
                    transacao: data.id_transacao || '',
                    funcoes: data.funcoes || []
                });
            } catch (error) {
                setError('Erro ao buscar perfil.');
                console.error('Erro ao buscar perfil.', error);
            }
        };

        const fetchTransacoes = async () => {
            try {
                const response = await fetch('http://localhost:3000/transactions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar transações.');
                }
                const data = await response.json();
                setTransacoes(data);
            } catch (error) {
                setError('Erro ao buscar transações.');
                console.error('Erro ao buscar transações.', error);
            }
        };

        const fetchFuncoes = async () => {
            try {
                const response = await fetch('http://localhost:3000/functions');
                if (!response.ok) {
                    throw new Error('Erro ao buscar funções.');
                }
                const data = await response.json();
                setFuncoes(data);
            } catch (error) {
                setError('Erro ao buscar funções.');
                console.error('Erro ao buscar funções.', error);
            }
        };

        fetchProfileData();
        fetchTransacoes();
        fetchFuncoes();
    }, [profileId]);

    const handleNomeChange = (event) => {
        setFormData({
            ...formData,
            nome: event.target.value
        });
    };

    const handleTransacaoChange = (event) => {
        setFormData({
            ...formData,
            transacao: event.target.value
        });
    };

    const handleFuncaoChange = (event) => {
        const {value, checked} = event.target;
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/profiles/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_perfil: formData.nome,
                    id_transacao: formData.transacao,
                    funcoes: formData.funcoes
                })
            });
            if (response.ok) {
                navigate('/profileManagement', { state: { message: 'Perfil atualizado com sucesso.' } });
            } else {
                console.error('Erro ao atualizar perfil.', response.statusText);
            }          
        } catch (error) {
            console.error('Erro ao atualizar perfil.', error);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Perfil</h1>
                {/* <h2 className={styles.nomePerfil}>Nome do Perfil</h2> */}
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
                                    checked={formData.transacao === transacao.id_transacao.toString()}
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
                                    checked={formData.funcoes.includes(funcao.id_funcao.toString())}
                                    onChange={handleFuncaoChange} />
                                    {`${funcao.nome_funcao} - ${funcao.descricao}`}
                            </label>
                        )    
                    )) : (
                        <p>Nenhuma função encontrada.</p>
                    )}  
                </div>
                <button type="submit" className={styles.criar}>Atualizar</button>
            </form>
        </main>
    );
}