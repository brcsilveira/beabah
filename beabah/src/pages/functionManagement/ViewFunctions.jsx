import { Link } from 'react-router-dom'
import styles from '../../styles/functionManagement/viewFunctions.module.css'

export function ViewFunctions() {
    return (
        <div>
            <h1 className={styles.titulo}>Funções Existentes</h1>
            <div className={styles.container}>
                <div className={styles.gridItem}><span>Adicionar</span></div>
                <div className={styles.gridItem}><span>Alterar</span></div>
                <div className={styles.gridItem}><span>Visualizar</span></div>
                <div className={styles.gridItem}><span>Adicionar Restrição</span></div>
            </div>
        </div>
    )
}