import styles from '../../styles/userManagement/editUser.module.css'

export function EditUser () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Usuário</h1>
                <div className={styles.dados}>
                    <input type="text" id="nome" name="nome" required placeholder="Alterar Nome" />
                    <input type="email" id="email" name="email" required placeholder="Alterar E-mail" />
                    <input type="password" id="senha" name="senha" required placeholder="Alterar Senha" />
                    <input type="password" id="confirmaSenha" name="confirmaSenha" required placeholder="Confirme a Senha" />
                </div>
                <button className={styles.atualizar}>Atualizar</button>
            </form>      
        </main>
    )
}