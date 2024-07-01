import { Outlet } from "react-router-dom"
import queroqueroLogo from '../assets/qq-logo.svg'
import styles from './ContainerNotLogged.module.css'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

export function ContainerNotLogged() {
    const auth = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

    if (auth.token) {
        return <Navigate to="/userManagement" />
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 450);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={queroqueroLogo} alt="Logo Quero-Quero" />
            </header>
            <main>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                {!isMobile && (
                    <div className={styles.footerDesktop}>
                    </div>
                )}
                {isMobile && (
                    <div className={styles.footerMobile}>
                        <p>Lojas Quero-Quero © Todos os direitos reservados</p>
                    </div>
                )}
            </footer>
        </div>
    )
}