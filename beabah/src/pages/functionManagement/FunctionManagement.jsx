import { Link, useLocation } from 'react-router-dom'
import styles from '../../styles/functionManagement/functionManagement.module.css'
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function FunctionManagement() {
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
            <h1 className={styles.titulo}>Gestão de Funções</h1>
            <Link to="/selectModulesF" className={styles.gridItem}><span>Criar</span></Link>
            <Link to="/editFunctions" className={styles.gridItem}><span>Editar</span></Link>
            <Link to="/viewFunctions" className={styles.gridItem}><span>Visualizar</span></Link>
            <Link to="/deleteFunctions" className={styles.gridItem}><span>Remover</span></Link>
            <ToastContainer className={styles.toastContainer} toastClassName={styles.toast}/>
        </div>
    )
}