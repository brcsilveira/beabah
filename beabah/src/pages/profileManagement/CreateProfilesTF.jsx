import { useState } from "react";
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
                    <label htmlFor="rkpc"><input type="radio" id='rkpc' name='transacao' value={1} checked={formData.transacao === '1'} onChange={handleTransacaoChange}/> Risk Price</label>
                    <label htmlFor="prfa"><input type="radio" id='prfa' name='transacao' value={2} checked={formData.transacao === '2'} onChange={handleTransacaoChange}/> Produto Fatura</label>
                    <label htmlFor="defo"><input type="radio" id='defo' name='transacao' value={3} checked={formData.transacao === '3'} onChange={handleTransacaoChange}/> Desconto em Folha</label>
                    <label htmlFor="pefi"><input type="radio" id='pefi' name='transacao' value={4} checked={formData.transacao === '4'} onChange={handleTransacaoChange}/> Pessoa Física</label>
                    <label htmlFor="peju"><input type="radio" id='peju' name='transacao' value={5} checked={formData.transacao === '5'} onChange={handleTransacaoChange}/> Pessoa Jurídica</label>
                </div>
                <h2>Funções</h2>
                <div className={styles.opcoes}>
                    <label><input type="checkbox" name="funcao" value="adicionar" checked={formData.funcoes.includes("adicionar")} onChange={handleFuncaoChange}/> ADAT (Adicionar)</label>
                    <label><input type="checkbox" name="funcao" value="alterar" checked={formData.funcoes.includes("alterar")} onChange={handleFuncaoChange}/> ALTR (Alterar)</label>
                    <label><input type="checkbox" name="funcao" value="visualizar" checked={formData.funcoes.includes("visualizar")} onChange={handleFuncaoChange}/> RETR (Visualizar)</label>
                    <label><input type="checkbox" name="funcao" value="addRestricao" checked={formData.funcoes.includes("addRestricao")} onChange={handleFuncaoChange}/> ADIC (Adicionar Restrição)</label>
                </div>
                <button type="submit" className={styles.criar}>Criar</button>
            </form>
        </main>
    )
}