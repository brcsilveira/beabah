import styles from '../../styles/profileManagement/ModalProfile.module.css';

export function ModalProfile({ isOpen, onClose, onConfirm, profile }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>{profile.nome_perfil}</h2>
                <p className={styles.mensagem}>Tem certeza que deseja excluir esse perfil?</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>Sim</button>
                    <button onClick={onClose} className={styles.cancel}>Não</button>
                </div>
            </div>
        </div>
    );
}