import styles from "../../styles/profileManagement/selectProfiles.module.css"

export function SelectProfiles () {
    return (
        <div>
            <h1 className={styles.titulo}>Selecionar Perfil</h1>
            <div className={styles.container}>
                <div className={styles.gridItem}><span>Administrador</span></div>
                <div className={styles.gridItem}><span>Caixa VC</span></div>
                <div className={styles.gridItem}><span>Comum</span></div>
                <div className={styles.gridItem}><span>Estabelecimento</span></div>
                <div className={styles.gridItem}><span>Gestor</span></div>
            </div>
        </div>
    )
}