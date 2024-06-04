import styles from "../../styles/functionManagement/createFunction.module.css"

export function CreateFunction () {
    return (
        <main>
            <form class={styles.formulario}>
                <h1 className={styles.tituloFuncao}>Criar Função</h1>
                <div className={styles.nomesContainer}>
                    <h2 className={styles.nomeModulo}>Nome do Módulo</h2>
                    <input type="text" className={styles.nomeFuncao} id='function' name='function' required placeholder='Nome (Obrigatório)'/>
                </div>
                <div className={styles.descricaoContainer}>
                    <h2 className={styles.descricao}>Descrição:</h2>
                    <textarea name="descricao" id="descricao" placeholder="Opcional"></textarea>
                </div>
                <button>Criar</button>
            </form>
        </main>
    )
}