import { Link } from 'react-router-dom'
import styles from '../../styles/functionManagement/functionManagement.module.css'

export function FunctionManagement() {
    return (
        <div className={styles.container}>
            <Link to="/selectModulesF" className={styles.gridItem}><span>Criar</span></Link>
            <Link to="/editFunctions" className={styles.gridItem}><span>Editar</span></Link>
            <Link to="/viewFunctions" className={styles.gridItem}><span>Visualizar</span></Link>
            <Link to="/deleteFunctions" className={styles.gridItem}><span>Remover</span></Link>
        </div>
    )
}