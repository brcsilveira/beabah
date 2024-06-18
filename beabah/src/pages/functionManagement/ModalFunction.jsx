import styles from '../../styles/functionManagement/ModalFunction.module.css';

export function ModalFunction({ isOpen, onClose, onConfirm, func }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>{func.nome_funcao}</h2>
                <p className={styles.mensagem}>Tem certeza que deseja excluir essa função?</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>Sim</button>
                    <button onClick={onClose} className={styles.cancel}>Não</button>
                </div>
            </div>
        </div>
    );
}