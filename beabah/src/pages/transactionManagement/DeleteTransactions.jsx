import { Link } from 'react-router-dom'
import styles from '../../styles/transactionManagement/deleteTransactions.module.css'

export function DeleteTransactions() {
    return (
        <div>
            <h1 className={styles.titulo}>Excluir Transação</h1>
            <div className={styles.container}>
                <div className={styles.gridItem}><span>Risk Price</span></div>
                <div className={styles.gridItem}><span>Produto Fatura</span></div>
                <div className={styles.gridItem}><span>Desconto em Folha</span></div>
                <div className={styles.gridItem}><span>Pessoa Física</span></div>
                <div className={styles.gridItem}><span>Pessoa Jurídica</span></div>
            </div>
        </div>
    )
}