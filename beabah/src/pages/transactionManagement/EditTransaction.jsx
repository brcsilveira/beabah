import styles from "../../styles/transactionManagement/editTransaction.module.css"

export function EditTransaction () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Transação</h1>
                <h2 className={styles.nomeModulo}>Nome da Transação</h2>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" placeholder="Opcional"></textarea>
                </div>
                <button>Atualizar</button>
            </form>
        </main>
    )
}