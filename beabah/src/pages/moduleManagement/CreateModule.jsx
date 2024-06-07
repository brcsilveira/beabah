import styles from "../../styles/moduleManagement/createModule.module.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateModule() {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Limpa os erros quando o usuário começa a digitar novamente
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
                nome_modulo: formData.nome,
                descricao: formData.descricao
            };
            
            try {
                const response = await fetch('http://localhost:3000/modules', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    navigate('/moduleManagement', { state: { message: 'Módulo cadastrado!' } });
                } else {
                    console.error('Erro ao cadastrar módulo:', response.statusText);
                    setErrors({ submit: 'Erro ao cadastrar módulo.' });
                }
            } catch (error) {
                console.error('Erro ao cadastrar módulo:', error);
                setErrors({ submit: 'Erro ao cadastrar módulo.' });
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
                <h1 className={styles.titulo}>Criar Módulo</h1>
                <input type="text" id="nome" name="nome" onChange={handleChange} placeholder="Nome do Módulo" className={errors.nome ? styles.inputError : ''} />
                <p className={`${styles.errorPlaceholder} ${errors.nome ? styles.errorVisible : ''}`}>
                    {errors.nome || ' '}
                </p>{/* Espaço reservado para mensagem de erro */}
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" onChange={handleChange} placeholder="Opcional"></textarea>
                </div>
                <button type="submit">Criar</button>
            </form>
        </main>
    )
}