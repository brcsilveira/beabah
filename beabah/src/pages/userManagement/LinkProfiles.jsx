import styles from "../../styles/userManagement/linkProfiles.module.css"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export function LinkProfiles() {
    const { userId } = useParams();
    const [ user, setUser ] = useState({});
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                const data = await response.json();
                setUser(data);
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
            {user && <h1 className={styles.titulo}>Vincular ou Alterar {user.nome_usuario}</h1>}
            <div className={styles.container}>
                <Link to='/linkProfile' className={styles.gridItem}><span>Vincular</span></Link>
                <Link className={styles.gridItem}><span>Alterar</span></Link>
            </div>
        </div>
    )
}