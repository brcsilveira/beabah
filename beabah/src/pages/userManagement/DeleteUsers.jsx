import styles from "../../styles/userManagement/deleteUsers.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalUser } from "./ModalUser";

export function DeleteUsers() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
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

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);  
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.nome_usuario.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${selectedUser.id_usuario}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUsers(users.filter(user => user.id_usuario !== selectedUser.id_usuario));
                closeModal();
                navigate('/userManagement', { state: { message: 'Usuário excluído!' } });
            } else {
                console.error('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Excluir Usuários</h1>
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
                            className={styles.deleteButton}
                            onClick={() => openModal(user)}    
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            <ModalUser
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
                user={selectedUser}
            />
        </div>
    )
}