import styles from "../../styles/userManagement/linkProfiles.module.css"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export function LinkProfiles() {
    const { userId } = useParams();
    const [ user, setUser ] = useState({});
    const [ error, setError ] = useState(null);
    const [ linkedProfiles, setLinkedProfiles ] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);

                if (data.id_perfil) {
                    setLinkedProfiles(true);
                }
            } catch (error) {
                setError('Erro ao buscar usuário');
            }
        };

        fetchUser();
    }, [userId]);

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            {user && <h1 className={styles.titulo}>{user.nome_usuario}</h1>}
            <div className={styles.container}>
                <Link to={`/linkProfile/${userId}`} className={styles.gridItem}>
                    <span>{linkedProfiles ? 'Alterar' : 'Vincular'}</span>
                </Link>
            </div>
        </div>
    )
}