import { Link, useLocation } from 'react-router-dom'
import styles from '../../styles/userManagement/userManagement.module.css'
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function UserManagement() {
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
          <h1 className={styles.titulo}>Gestão de Usuários</h1>
          <Link to="/registerUser" className={styles.gridItem}>
            <span>Cadastrar</span>
          </Link>
          <Link to="/editUsers" className={styles.gridItem}>
            <span>Editar</span>
          </Link>
          <Link to="/selectUsers" className={styles.gridItem}>
            <span>Vincular</span>
          </Link>
          <Link to="/deleteUsers" className={styles.gridItem}>
            <span>Excluir</span>
          </Link>
          <Link to="/viewUsers" className={styles.gridItem}>
            <span>Visualizar</span>
          </Link>
          <ToastContainer className={styles.toastContainer} toastClassName={styles.toast}/>
        </div>
    );
}