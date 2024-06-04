import { Link } from 'react-router-dom'
import styles from '../../styles/moduleManagement/deleteModules.module.css'

export function DeleteModules() {
    return (
        <div>
            <h1 className={styles.titulo}>Excluir Módulo</h1>
            <div className={styles.container}>
                <div className={styles.gridItem}><span>Cadastro</span></div>
                <div className={styles.gridItem}><span>Digitalização</span></div>
                <div className={styles.gridItem}><span>Fichas VerdeCard</span></div>
                <div className={styles.gridItem}><span>VerdeCard</span></div>
                <div className={styles.gridItem}><span>Lojista Afiliado</span></div>
                <div className={styles.gridItem}><span>Controle</span></div>
            </div>
        </div>
    )
}