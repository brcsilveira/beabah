import styles from '../../styles/moduleManagement/ModalModule.module.css';

export function ModalModule({ isOpen, onClose, onConfirm, module }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>{module.nome_modulo}</h2>
                <p className={styles.mensagem}>Tem certeza que deseja excluir esse módulo?</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>Sim</button>
                    <button onClick={onClose} className={styles.cancel}>Não</button>
                </div>
            </div>
        </div>
    );
}