import styles from "../../styles/transactionManagement/createTransaction.module.css"

export function CreateTransaction () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Criar Transação</h1>
                <h2 className={styles.nomeModulo}>Nome da Transação</h2>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" placeholder="Opcional"></textarea>
                </div>
                <button className={styles.criar}>Criar</button>
            </form>
        </main>
    )
}