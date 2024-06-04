import { Link } from 'react-router-dom'
import styles from '../../styles/transactionManagement/transactionManagement.module.css'

export function TransactionManagement() {
    return (
        <div className={styles.container}>
            <div className={styles.gridItem}><span>Atribuir</span></div>
            <div className={styles.gridItem}><span>Editar</span></div>
            <div className={styles.gridItem}><span>Criar</span></div>
            <div className={styles.gridItem}><span>Remover</span></div>
            <div className={styles.gridItem}><span>Visualizar</span></div>
        </div>
    )
}