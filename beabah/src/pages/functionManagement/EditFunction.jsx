import styles from "../../styles/functionManagement/editFunction.module.css"

export function EditFunction () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Função</h1>
                <h2 className={styles.nomeFuncao}>Nome da Função</h2>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" placeholder="Opcional"></textarea>
                </div>
                <button>Atualizar</button>
            </form>
        </main>
    )
}