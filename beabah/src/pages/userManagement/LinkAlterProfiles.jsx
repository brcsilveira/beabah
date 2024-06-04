import styles from "../../styles/userManagement/linkAlterProfiles.module.css"

export function LinkAlterProfiles() {
    return (
        <div className={styles.container}>
            <div className={styles.gridItem1}><span>Cadastrar</span></div>
            <div className={styles.gridItem2}><span>Editar</span></div>
        </div>
    )
}