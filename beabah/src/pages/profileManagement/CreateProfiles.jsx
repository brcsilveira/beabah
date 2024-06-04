import { Link } from 'react-router-dom'
import styles from '../../styles/profileManagement/createProfiles.module.css'

export function CreateProfiles() {
    return (
        <div>
            <h1 className={styles.titulo}>Criar Perfil</h1>
            <div className={styles.container}>
            <Link to="/createProfileTF/Administrador" className={styles.gridItem}>
                    <span>Administrador</span>
            </Link>
            <Link to="/createProfileTF/CaixaVC" className={styles.gridItem}>
                <span>Caixa VC</span>
            </Link>
            <Link to="/createProfileTF/Comum" className={styles.gridItem}>
                <span>Comum</span>
            </Link>
            <Link to="/createProfileTF/Estabelecimento" className={styles.gridItem}>
                <span>Estabelecimento</span>
            </Link>
            <Link to="/createProfileTF/Gestor" className={styles.gridItem}>
                <span>Gestor</span>
            </Link>
            <Link to="/createProfile" className={styles.gridItem}>
                <span>Outro</span>
            </Link>
            </div>
        </div>
    )
}