import styles from "../../styles/profileManagement/deleteProfiles.module.css"

export function DeleteProfiles () {
    return (
        <div>
            <h1 className={styles.titulo}>Excluir Perfil</h1>
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