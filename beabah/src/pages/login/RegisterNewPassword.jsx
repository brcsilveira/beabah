import styles from '../../styles/login/registerNewPassword.module.css'

export function RegisterNewPassword() {
    return (
        <div className={styles.body}>
            <form action="#" className={styles.formulario}>
                <h1 className={styles.titulo}>Nova Senha</h1>
                <div className={styles.dados}>
                    <input type="password" id="password" name="password" required placeholder="Senha" />
                    <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirme a Senha" />
                </div>
                <button >Registrar</button>
            </form>
        </div>
    )
}