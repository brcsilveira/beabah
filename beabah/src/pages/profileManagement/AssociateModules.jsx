import styles from "../../styles/profileManagement/associateModules.module.css"

export function AssociateModules () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
            <h1 className={styles.titulo}>Associar</h1>
            <h2 className={styles.nomePerfil}>Nome do Perfil</h2>
            <div className={styles.opcoes}>
                <label><input type="checkbox" name="perfil" value="CA (cadastro)" /> CA (cadastro)</label>
                <label><input type="checkbox" name="perfil" value="DG (Digitalização)" /> DG (Digitalização)</label>
                <label><input type="checkbox" name="perfil" value="FV (Fichas VerdeCard)" /> FV (Fichas VerdeCard)</label>
                <label><input type="checkbox" name="perfil" value="SC (VerdeCard)" /> SC (VerdeCard)</label>
                <label><input type="checkbox" name="perfil" value="VC (Lojista Afiliado)" /> VC (Lojista Afiliado)</label>
                <label><input type="checkbox" name="perfil" value="VG (Controle)" /> VG (Controle)</label>
            </div>
            <button className={styles.associar}>Associar</button>
            </form>
        </main>
    )
}