import styles from '../../styles/userManagement/ModalUser.module.css';

export function ModalUser({ isOpen, onClose, onConfirm, user }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>{user.nome_usuario}</h2>
                <p className={styles.mensagem}>Tem certeza que deseja excluir esse usuário?</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>Sim</button>
                    <button onClick={onClose} className={styles.cancel}>Não</button>
                </div>
            </div>
        </div>
    );
}