import styles from "../../styles/moduleManagement/createModule.module.css"

export function CreateModule() {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
                <h1 className={styles.titulo}>Criar Módulo</h1>
                <h2 className={styles.nomeModulo}>Nome do Módulo</h2>
                <div>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" placeholder="Opcional"></textarea>
                </div>
                <button>Criar</button>
            </form>
        </main>
    )
}