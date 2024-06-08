import styles from "../../styles/userManagement/viewUsers.module.css";
import { useEffect, useState } from "react";

export function ViewUsers() {
    const [users, setUsers] = useState([]);

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

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Visualizar Usuários</h1>
            <ul className={styles.listaUsuarios}>
                {users.map(user => (
                    <li key={user.id_usuario}>
                    <span className={styles.userName}>{user.nome_usuario}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}