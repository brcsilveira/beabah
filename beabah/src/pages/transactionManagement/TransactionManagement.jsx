import { Link, useLocation } from 'react-router-dom'
import styles from '../../styles/transactionManagement/transactionManagement.module.css'
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function TransactionManagement() {
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
            <h1 className={styles.titulo}>Gestão de Transações</h1>
            <Link to="/selectModulesT" className={styles.gridItem}><span>Atribuir</span></Link >
            <Link to="/editTransactions" className={styles.gridItem}><span>Editar</span></Link >
            <Link to="/createTransaction" className={styles.gridItem}><span>Criar</span></Link >
            <Link to="/deleteTransactions" className={styles.gridItem}><span>Remover</span></Link >
            <Link to="/viewTransactions" className={styles.gridItem}><span>Visualizar</span></Link >
            <ToastContainer className={styles.toastContainer} toastClassName={styles.toast}/>
        </div>
    )
}