import { Link } from 'react-router-dom'
import styles from '../../styles/profileManagement/profileManagement.module.css'

export function ProfileManagement() {
    return (
        <div className={styles.container}>
            <Link to="/createProfiles" className={styles.gridItem}>
                <span>Criar</span>
            </Link>
            <Link to="/editProfiles" className={styles.gridItem}>
                <span>Editar</span>
            </Link>
            <Link to="/selectProfiles" className={styles.gridItem}>
                <span>Associar</span>
            </Link>
            <Link to="/deleteProfiles" className={styles.gridItem}>
                <span>Excluir</span>
            </Link>
            <Link to="/viewProfiles" className={styles.gridItem}>
                <span>Visualizar</span>
            </Link>
        </div>
    )
}