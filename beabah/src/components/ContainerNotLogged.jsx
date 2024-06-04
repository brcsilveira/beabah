import { Outlet } from "react-router-dom"
import queroqueroLogo from '../assets/qq-logo.svg'
import styles from './ContainerNotLogged.module.css'

export function ContainerNotLogged() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={queroqueroLogo} alt="Logo Quero-Quero" />
            </header>
            <main>
                <Outlet />
            </main>
            <footer className={styles.footer}>
            <p>Lojas Quero-Quero © Todos os direitos reservados</p>
            </footer>
        </div>
    )
}