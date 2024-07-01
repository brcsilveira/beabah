import styles from './Header.module.css';
import queroqueroLogo from '../assets/qq-logo.svg';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';

export function Header() {
    const location = useLocation();
    const auth = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!auth.token) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <header className={styles.headerbg}>
                <div className={styles.header}>
                    {isMobile ? (
                        <button onClick={toggleMenu} className={styles.menuButton}>
                            &#9776;
                        </button>
                    ) : (
                        <img src={queroqueroLogo} alt="Logo Quero-Quero" />
                    )}
                    {!isMobile && (
                        <nav className={styles.navDesktop}>
                            <ul className={styles.navList}>
                                <li>
                                    <Link
                                    to="/dashboard"
                                    className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
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
                                    className={`${styles.navLink} ${location.pathname === '/transactionManagement' || location.pathname === '/createTransaction' || location.pathname === '/selectModulesT' || location.pathname === '/viewTransactions' || location.pathname.startsWith('/assignTransactions') || location.pathname.startsWith('/editTransaction') || location.pathname.startsWith('/deleteTransactions') ? styles.active : ''}`}
                                    >
                                        Transações
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                    <div className={styles.user}>
                        <p onClick={toggleDropdown} className={styles.userName}>
                            Olá, {auth.user.nome_usuario} <span className={`${styles.indicator} ${dropdownOpen ? styles.open : ''}`}>{dropdownOpen ? '˄' : '˅'}</span>
                        </p>
                        <div className={`${styles.dropdown} ${dropdownOpen ? styles.show : ''}`}>
                            <button type='button' onClick={auth.logout}>Sair</button>
                        </div>
                    </div>
                </div>
            </header>
            {isMobile && (
                <>
                    <div className={`${styles.menuOverlay} ${menuOpen ? styles.show : ''}`} onClick={toggleMenu}></div>
                    <nav className={`${styles.navMobile} ${menuOpen ? styles.showMenu : ''}`}>
                        <ul className={styles.navListMobile}>
                            <li>
                                <Link
                                to="/dashboard"
                                className={`${styles.navLinkMobile} ${location.pathname === '/dashboard' ? styles.active : ''}`}
                                onClick={toggleMenu}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link 
                                to="/userManagement" 
                                className={`${styles.navLinkMobile} ${location.pathname === '/userManagement' || location.pathname === '/registerUser' || location.pathname === '/editUsers' || location.pathname.startsWith('/editUser') || location.pathname === '/deleteUsers' || location.pathname === '/viewUsers' || location.pathname === '/selectUsers' || location.pathname.startsWith('/linkProfile')  ? styles.active : ''}`}
                                onClick={toggleMenu}
                                >
                                    Usuários
                                </Link>
                            </li>
                            <li>
                                <Link 
                                to="/profileManagement" 
                                className={`${styles.navLinkMobile} ${location.pathname === '/profileManagement' || location.pathname.startsWith('/createProfilesTF')  || location.pathname === '/editProfiles' || location.pathname === '/selectProfiles' || location.pathname === '/deleteProfiles' || location.pathname === '/viewProfiles' || location.pathname.startsWith('/editProfile') || location.pathname.startsWith('/associateModules') ? styles.active : ''}`}
                                onClick={toggleMenu}
                                >
                                    Perfis
                                </Link>
                            </li>
                            <li>
                                <Link 
                                to="/moduleManagement" 
                                className={`${styles.navLinkMobile} ${location.pathname === '/moduleManagement' || location.pathname === '/createModule' || location.pathname.startsWith('/editModule') || location.pathname === '/viewModules' || location.pathname === '/deleteModules' ? styles.active : ''}`}
                                onClick={toggleMenu}
                                >
                                    Módulos
                                </Link>
                            </li>
                            <li>
                                <Link 
                                to="/functionManagement" 
                                className={`${styles.navLinkMobile} ${location.pathname === '/functionManagement' || location.pathname === '/selectModulesF' || location.pathname.startsWith('/createFunction') || location.pathname === '/deleteFunctions' || location.pathname === '/editFunction' || location.pathname.startsWith('/editFunction') || location.pathname === '/viewFunctions' ? styles.active : ''}`}
                                onClick={toggleMenu}
                                >
                                    Funções
                                </Link>
                            </li>
                            <li>
                                <Link 
                                to="/transactionManagement" 
                                className={`${styles.navLinkMobile} ${location.pathname === '/transactionManagement' || location.pathname === '/createTransaction' || location.pathname === '/selectModulesT' || location.pathname === '/viewTransactions' || location.pathname.startsWith('/assignTransactions') || location.pathname.startsWith('/editTransaction') || location.pathname.startsWith('/deleteTransactions') ? styles.active : ''}`}
                                onClick={toggleMenu}
                                >
                                    Transações
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
            <main>
                <Outlet />
            </main>
        </>
    );
}
