import styles from './Header.module.css';
import queroqueroLogo from '../assets/qq-logo.svg';
import maleUser from '../assets/maleUser.svg';
import { Outlet, Link, useLocation } from 'react-router-dom';


export function Header() {
    const location = useLocation();

    return (
        <>
            <header className={styles.headerbg}>
                <div className={styles.header}>
                    <img src={queroqueroLogo} alt="Logo Quero-Quero" />
                    <nav>
                    <ul className={styles.navList}>
                        <li>
                            <Link 
                            to="/userManagement" 
                            className={`${styles.navLink} ${location.pathname === '/userManagement' || location.pathname === '/registerUser' || location.pathname === '/editUsers' || location.pathname === '/linkProfiles' || location.pathname === '/deleteUsers' || location.pathname === '/viewUsers' ? styles.active : ''}`}
                            >
                            Usuários
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/profileManagement" 
                            className={`${styles.navLink} ${location.pathname === '/profileManagement' || location.pathname === '/createProfiles' || location.pathname === '/createProfile' || location.pathname === '/createProfileTF'  || location.pathname === '/editProfiles' || location.pathname === '/selectProfiles' || location.pathname === '/deleteProfiles' || location.pathname === '/viewProfiles' ? styles.active : ''}`}
                            >
                            Perfis
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/moduleManagement" 
                            className={`${styles.navLink} ${location.pathname === '/moduleManagement' ? styles.active : ''}`}
                            >
                            Módulos
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/functionManagement" 
                            className={`${styles.navLink} ${location.pathname === '/functionManagement' ? styles.active : ''}`}
                            >
                            Funções
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/transactionManagement" 
                            className={`${styles.navLink} ${location.pathname === '/transactionManagement' ? styles.active : ''}`}
                            >
                            Transações
                            </Link>
                        </li>
                </ul>
                    </nav>
                    <div className={styles.user}>
                        <img src={maleUser} alt="Foto do Usuário" />
                        <p>Olá, Bruno</p> 
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}