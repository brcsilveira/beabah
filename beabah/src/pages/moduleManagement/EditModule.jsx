import styles from "../../styles/moduleManagement/editModule.module.css"

export function EditModule() {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Editar Módulo</h1>
                <h2 className={styles.nomeModulo}>Nome do Módulo</h2>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" placeholder="Opcional"></textarea>
                </div>
                <button>Atualizar</button>
            </form>
        </main>
    )
}