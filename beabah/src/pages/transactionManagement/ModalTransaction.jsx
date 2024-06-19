import styles from '../../styles/transactionManagement/ModalTransaction.module.css';

export function ModalTransaction({ isOpen, onClose, onConfirm, transaction }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>{transaction.nome_transacao}</h2>
                <p className={styles.mensagem}>Tem certeza que deseja excluir essa transação?</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>Sim</button>
                    <button onClick={onClose} className={styles.cancel}>Não</button>
                </div>
            </div>
        </div>
    );
}