import { Link } from 'react-router-dom'
import styles from '../../styles/functionManagement/selectModulesF.module.css'

export function SelectModulesF() {
    return (
        <div>
            <h1 className={styles.titulo}>Selecionar Módulo</h1>
            <div className={styles.container}>
                <Link to="/createFunction/Cadastro" className={styles.gridItem}><span>Cadastro</span></Link>
                <Link to="/createFunction/Digitalização" className={styles.gridItem}><span>Digitalização</span></Link>
                <Link to="/createFunction/FichasVerdeCard" className={styles.gridItem}><span>Fichas VerdeCard</span></Link>
                <Link to="/createFunction/VerdeCard" className={styles.gridItem}><span>VerdeCard</span></Link>
                <Link to="/createFunction/LojistaAfiliado" className={styles.gridItem}><span>Lojista Afiliado</span></Link>
                <Link to="/createFunction/Controle" className={styles.gridItem}><span>Controle</span></Link>
            </div>
        </div>
    );
}