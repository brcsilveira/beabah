import { Link } from 'react-router-dom'
import styles from '../../styles/login/emailSent.module.css'

export function EmailSent() {
    return (
        <div>
            <div className={styles.formulario}>
                <h1 className={styles.titulo}>Email Enviado</h1>
                <p className={styles.texto}>Confira seu email para saber como registrar uma nova senha.</p>
                <Link to="/login" className={styles.link}>Voltar para o login</Link>
            </div>
        </div>
    )
}