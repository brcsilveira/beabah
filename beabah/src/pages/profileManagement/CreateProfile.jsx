import styles from "../../styles/profileManagement/createProfile.module.css"

export function CreateProfile() {
    return (
        <main>
            <form action="#" className={styles.formulario}>
                <h1 className={styles.titulo}>Criar Perfil</h1>
                <input type="text" id="nome" name="nome" required placeholder="Nome (Obrigatório)"/>
                <button className={styles.proximo}>Próximo</button>
            </form>
        </main>
    ) 
}