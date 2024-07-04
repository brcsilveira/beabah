import styles from "../../styles/userManagement/editUsers.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Adicionar um serach para muito usuários

export function EditUsers() {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/editUser/${userId}`);
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.nome_usuario.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Editar Usuários</h1>
            <input
                type="text"
                placeholder="Pesquisar usuário"
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <ul className={styles.listaUsuarios}>
                {filteredUsers.map(user => (
                    <li key={user.id_usuario}>
                        <span className={styles.userName}>{user.nome_usuario}</span>
                        <span className={styles.userEmail}>{user.email}</span>
                        <button
                            className={styles.editButton}
                            onClick={() => handleEdit(user.id_usuario)}    
                        >
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}