import styles from '../../styles/userManagement/registerUser.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterUser() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
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
                nome_usuario: formData.nome,
                email: formData.email,
                senha: formData.senha,
                id_perfil: null, // Perfil padrão
                codigo: Math.floor(Math.random() * 100000) // Gera um código aleatório de 0 a 99999
            }
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
                
            navigate('/userManagement', { state: { message: 'Usuário cadastrado!' } });
        } else {
            setErrors(validationErrors);
        }
    };

    const validateFormData = (data) => {
        let errors = {};

        if (!data.nome.trim()) {
            errors.nome = 'Nome é obrigatório';
        }

        if (!data.email.trim()) {
            errors.email = 'E-mail é obrigatório';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'E-mail inválido';
        }

        if (!data.senha.trim()) {
            errors.senha = 'Senha é obrigatória';
        } else if (data.senha !== data.confirmaSenha) {
            errors.confirmaSenha = 'As senhas não coincidem';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        // Simples validação de e-mail
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1 className={styles.titulo}>Cadastrar Usuário</h1>
                <div className={styles.dados}>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" />
                    <p className={styles.errorPlaceholder}></p> {/* Espaço reservado para mensagem de erro */}
                    {errors.nome && <p className={styles.error}>{errors.nome}</p>}
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
                    <p className={styles.errorPlaceholder}></p> {/* Espaço reservado para mensagem de erro */}
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                    <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" />
                    <p className={styles.errorPlaceholder}></p> {/* Espaço reservado para mensagem de erro */}
                    {errors.senha && <p className={styles.error}>{errors.senha}</p>}
                    <input type="password" id="confirmaSenha" name="confirmaSenha" value={formData.confirmaSenha} onChange={handleChange} placeholder="Confirme a Senha" />
                    <p className={styles.errorPlaceholder}></p> {/* Espaço reservado para mensagem de erro */}
                    {errors.confirmaSenha && <p className={styles.error}>{errors.confirmaSenha}</p>}
                </div>
                <button className={styles.cadastrar}>Cadastrar</button>
            </form>      
        </main>
    )
}