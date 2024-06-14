import styles from "../../styles/moduleManagement/editModule.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditModule() {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const [formData, setFormData] = useState({
        nome: "",
        descricao: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModuleData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/modules/${moduleId}`);
                if (!response.ok) {
                    throw new Error('Módulo não encontrado.');
                }
                const data = await response.json();
                setFormData({
                    nome: data.nome_modulo || '',
                    descricao: data.descricao || ''
                });
            } catch (error) {
                setError('Erro ao buscar módulo.');
                console.error('Erro ao buscar módulo.', error);
            }
        };

        fetchModuleData();
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

        if (!formData.nome.trim()) {
            setError('Nome é obrigatório.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/modules/${moduleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_modulo: formData.nome,
                    descricao: formData.descricao
                })
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar módulo.');
            }
            navigate('/moduleManagement', { state: { message: 'Módulo atualizado!' } });
        } catch (error) {
            setError('Erro ao atualizar módulo.');
            console.error('Erro ao atualizar módulo.', error);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Módulo</h1>
                <input type="text" id="nome" name="nome" value={formData.nome} className={styles.nome} required placeholder="Nome (Obrigatório)" onChange={handleNomeChange}/>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" value={formData.descricao} placeholder="Opcional" onChange={handledescricaoChange}></textarea>
                </div>
                <button type='submit' className={styles.atualizar}>Atualizar</button>
            </form>
        </main>
    )
}