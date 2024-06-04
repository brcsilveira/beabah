import { Link } from 'react-router-dom'
import styles from '../../styles/functionManagement/functionManagement.module.css'

export function FunctionManagement() {
    return (
        <div className={styles.container}>
            <div className={styles.gridItem}><span>Criar</span></div>
            <div className={styles.gridItem}><span>Editar</span></div>
            <div className={styles.gridItem}><span>Visualizar</span></div>
            <div className={styles.gridItem}><span>Remover</span></div>
        </div>
    )
}