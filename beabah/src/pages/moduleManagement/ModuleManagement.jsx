import { Link, useLocation } from 'react-router-dom'
import styles from '../../styles/moduleManagement/moduleManagement.module.css'
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModuleManagement() {
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
            <Link to="/createModule" className={styles.gridItem}><span>Criar</span></Link>
            <Link to="/editModules" className={styles.gridItem}><span>Editar</span></Link>
            <Link to="/viewModules" className={styles.gridItem}><span>Visualizar</span></Link>
            <Link to="/deleteModules" className={styles.gridItem}><span>Remover</span></Link>
        </div>
    )
}