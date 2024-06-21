import styles from "../../styles/functionManagement/editFunction.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditFunction () {
    const navigate = useNavigate();
    const { functionId } = useParams();
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        modulo: ""
    });
    const [error, setError] = useState(null);
    const [moduleId, setModuleId] = useState(null);
    const [module, setModule] = useState({});

    useEffect(() => {
        const fetchFunctionData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/functions/${functionId}`);
                if (!response.ok) {
                    throw new Error('Função não encontrada.');
                }
                const data = await response.json();
                setFormData({
                    nome: data.nome_funcao || '',
                    descricao: data.descricao || '',
                    modulo: data.id_modulo || ''
                });
                setModuleId(data.id_modulo);
            } catch (error) {
                setError('Erro ao buscar função.');
                console.error('Erro ao buscar função.', error);
            }
        };

        fetchFunctionData();
    }, [functionId]);

    useEffect(() => {
        const fetchModuleData = async () => {
            if (moduleId) {
                try {
                    const response = await fetch(`http://localhost:3000/modules/${moduleId}`);
                    if (!response.ok) {
                        throw new Error('Módulo não encontrado.');
                    }
                    const data = await response.json();
                    setModule(data);
                } catch (error) {
                    setError('Erro ao buscar módulo.');
                    console.error('Erro ao buscar módulo.', error);
                }
            }
        };

        if (moduleId) {
            fetchModuleData();
        }
    }, [moduleId]);

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
        try {
            const response = await fetch(`http://localhost:3000/functions/${functionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_funcao: formData.nome,
                    descricao: formData.descricao,
                    id_modulo: formData.modulo
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar função.');
            }

            navigate('/functionManagement', { state: { message: 'Função atualizada!' } });
        } catch (error) {
            setError('Erro ao atualizar função.');
            console.error('Erro ao atualizar função.', error);
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Função</h1>
                <h2 className={styles.nomeModulo}>{module.nome_modulo} - {module.descricao}</h2>
                <input type="text" id="nome" name="nome" value={formData.nome} className={styles.nomeFuncao} required placeholder="Nome (Obrigatório)" onChange={handleNomeChange}/>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" value={formData.descricao} placeholder="Opcional" onChange={handledescricaoChange}></textarea>
                </div>
                <button type='submit' className={styles.atualizar}>Atualizar</button>
            </form>
        </main>
    )
}