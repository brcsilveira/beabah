import { Link } from 'react-router-dom'
import styles from '../../styles/login/forgot-password.module.css'

export function ForgotPassword() {
    return (
        <div>
            <form action="#" className={styles.formulario}>
                <h1 className={styles.titulo}>Insira seu E-mail</h1>
                <input type="email" id="email" name="email" className={styles.dados} required placeholder="E-mail"/>
                <button className="buttonSend">Enviar</button>
            </form>
        </div>
    )
}