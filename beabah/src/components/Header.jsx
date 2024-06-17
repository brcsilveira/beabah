import styles from './Header.module.css';
import queroqueroLogo from '../assets/qq-logo.svg';
import maleUser from '../assets/maleUser.svg';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';


export function Header() {
    const location = useLocation();
    const { profileName } = useParams();

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
                            className={`${styles.navLink} ${location.pathname === '/userManagement' || location.pathname === '/registerUser' || location.pathname === '/editUsers' || location.pathname.startsWith('/editUser') || location.pathname === '/deleteUsers' || location.pathname === '/viewUsers' || location.pathname === '/selectUsers' || location.pathname.startsWith('/linkProfile')  ? styles.active : ''}`}
                            >
                            Usuários
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/profileManagement" 
                            className={`${styles.navLink} ${location.pathname === '/profileManagement' || location.pathname.startsWith('/createProfilesTF')  || location.pathname === '/editProfiles' || location.pathname === '/selectProfiles' || location.pathname === '/deleteProfiles' || location.pathname === '/viewProfiles' || location.pathname.startsWith('/editProfile') || location.pathname.startsWith('/associateModules') ? styles.active : ''}`}
                            >
                            Perfis
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/moduleManagement" 
                            className={`${styles.navLink} ${location.pathname === '/moduleManagement' || location.pathname === '/createModule' || location.pathname.startsWith('/editModule') || location.pathname === '/viewModules' || location.pathname === '/deleteModules' ? styles.active : ''}`}
                            >
                            Módulos
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/functionManagement" 
                            className={`${styles.navLink} ${location.pathname === '/functionManagement' || location.pathname === '/selectModulesF' || location.pathname.startsWith('/createFunction') || location.pathname === '/deleteFunctions' || location.pathname === '/editFunction' || location.pathname.startsWith('/editFunction') || location.pathname === '/viewFunctions' ? styles.active : ''}`}
                            >
                            Funções
                            </Link>
                        </li>
                        <li>
                            <Link 
                            to="/transactionManagement" 
                            className={`${styles.navLink} ${location.pathname === '/transactionManagement' || location.pathname === '/createTransaction' ? styles.active : ''}`}
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