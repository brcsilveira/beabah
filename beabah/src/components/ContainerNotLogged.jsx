import { Outlet } from "react-router-dom"
import queroqueroLogo from '../assets/qq-logo.svg'
import styles from './ContainerNotLogged.module.css'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

export function ContainerNotLogged() {
    const auth = useContext(AuthContext);

    if (auth.token) {
        return <Navigate to="/userManagement" />
    }

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