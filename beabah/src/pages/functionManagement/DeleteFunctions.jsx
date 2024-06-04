import { Link } from 'react-router-dom'
import styles from '../../styles/functionManagement/deleteFunctions.module.css'

export function DeleteFunctions() {
    return (
        <div>
            <h1 className={styles.titulo}>Excluir Função</h1>
            <div className={styles.container}>
                <div className={styles.gridItem}><span>Adicionar</span></div>
                <div className={styles.gridItem}><span>Alterar</span></div>
                <div className={styles.gridItem}><span>Visualizar</span></div>
                <div className={styles.gridItem}><span>Adicionar Restrição</span></div>
            </div>
        </div>
    )
}