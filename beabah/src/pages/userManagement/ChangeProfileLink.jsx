import styles from "../../styles/userManagement/changeProfileLink.module.css"

export function ChangeProfileLink () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Alterar Vínculo</h1>
                <h2 className={styles.nomeUsuario}>Nome do Usuário</h2>
                <div className={styles.opcoes}>
                    <label htmlFor="admin"><input type="radio" id='admin' name='perfil' value="administrador"/> Administrador</label>
                    <label htmlFor="comum"><input type="radio" id='comum' name='perfil' value="comum"/> Comum</label>
                    <label htmlFor="caixaVC"><input type="radio" id='caixaVC' name='perfil' value="caixaVC"/> Caixa VC</label>
                    <label htmlFor="estabelecimento"><input type="radio" id='estabelecimento' name='perfil' value="estabelecimento"/> Estabelecimento</label>
                    <label htmlFor="gestor"><input type="radio" id='gestor' name='perfil' value="gestor"/> Gestor</label>
                </div>
                <button className={styles.alterar}>Alterar</button>
            </form>
        </main>
    )
}