import { Link, useLocation } from 'react-router-dom'
import styles from '../../styles/profileManagement/profileManagement.module.css'
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ProfileManagement() {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message, {
              className: styles.toast,
              position: 'top-right'
            });
        }
    }, [location.state]);

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Gestão de Perfis</h1>
            <Link to="/createProfilesTF" className={styles.gridItem}>
                <span>Criar</span>
            </Link>
            <Link to="/editProfiles" className={styles.gridItem}>
                <span>Editar</span>
            </Link>
            <Link to="/selectProfiles" className={styles.gridItem}>
                <span>Associar</span>
            </Link>
            <Link to="/deleteProfiles" className={styles.gridItem}>
                <span>Excluir</span>
            </Link>
            <Link to="/viewProfiles" className={styles.gridItem}>
                <span>Visualizar</span>
            </Link>
            <ToastContainer className={styles.toastContainer} toastClassName={styles.toast}/>
        </div>
    )
}