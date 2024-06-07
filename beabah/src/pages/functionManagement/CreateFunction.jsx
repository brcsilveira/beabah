import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import styles from "../../styles/functionManagement/createFunction.module.css"

export function CreateFunction () {
    const { moduleName } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulário válido. Enviando dados:', formData);
            const data = {
                nome_funcao: formData.nome,
                descricao: formData.descricao,
                nome_modulo: moduleName
            };

            try {
                const response = await fetch('http://localhost:3000/functions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    navigate('/functionManagement', { state: { message: 'Função cadastrada!' } });
                } else {
                    console.error('Erro ao cadastrar função:', response.statusText);
                    setErrors({ submit: 'Erro ao cadastrar função.' });
                }
            } catch (error) {
                console.error('Erro ao cadastrar função:', error);
                setErrors({ submit: 'Erro ao cadastrar função.' });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateFormData = (data) => {
        let errors = {};

        if (!data.nome.trim()) {
            errors.nome = 'Nome é obrigatório';
        }

        return errors;
    };


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
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome (Obrigatório)"
                    />
                    <p className={`${styles.errorPlaceholder} ${errors.nome ? styles.errorVisible : ''}`}>
                    {errors.nome || ' '}
                    </p>{/* Espaço reservado para mensagem de erro */}
                </div>
                <div className={styles.descricaoContainer}>
                    <label htmlFor="descricao" className={styles.descricao}>Descrição:</label>
                    <textarea 
                        name="descricao" 
                        id="descricao" 
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Opcional"
                    ></textarea>
                </div>
                <button type="submit">Criar</button>
            </form>
        </main>
    )
}