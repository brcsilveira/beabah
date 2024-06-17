import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import styles from "../../styles/functionManagement/createFunction.module.css"

export function CreateFunction () {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [ functionData, setFunctionData ] = useState({
        nome: '',
        descricao: '',
        id_modulo: moduleId
    });
    const [moduleName, setModuleName] = useState('');

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(`http://localhost:3000/modules/${moduleId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setModuleName(data.nome);
            } catch (error) {
                console.error('Erro ao buscar módulo');
            }
        };

        fetchModule();
    }, [moduleId]);

    const handleChange = (event) => {
        setFunctionData({
            ...functionData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/functions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: functionData.nome,
                    descricao: functionData.descricao,
                    id_modulo: functionData.id_modulo
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate(`/module/${moduleId}`);
        } catch (error) {
            console.error('Erro ao criar função');
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.tituloFuncao}>Criar Função</h1>
                <div className={styles.nomesContainer}>
                    <h2 className={styles.nomeModulo}>{moduleName}</h2>
                    <input 
                        type="text"
                        className={styles.nomeFuncao}
                        id="function"
                        name="nome"
                        onChange={handleChange}
                        placeholder="Nome (Obrigatório)"
                    />
                </div>
                <div className={styles.descricaoContainer}>
                    <label htmlFor="descricao" className={styles.descricao}>Descrição:</label>
                    <textarea 
                        name="descricao" 
                        id="descricao" 
                        onChange={handleChange}
                        placeholder="Opcional"
                    ></textarea>
                </div>
                <button type="submit">Criar</button>
            </form>
        </main>
    )
}