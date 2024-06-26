import { Link } from 'react-router-dom'
import styles from '../../styles/login/passwordReset.module.css'

export function PasswordReset() {
    return (
        <div>
            <div className={styles.formulario}>
                <h1 className={styles.titulo}>Senha Redefinida</h1>
                <p className={styles.texto}>Volte para tela inicial para efetuar o login.</p>
                <Link to="/login" className={styles.link}>Voltar para tela inicial</Link>
            </div>
        </div>
    )
}