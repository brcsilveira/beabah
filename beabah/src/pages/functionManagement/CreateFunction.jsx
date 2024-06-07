import { useParams } from 'react-router-dom'
import styles from "../../styles/functionManagement/createFunction.module.css"

export function CreateFunction () {
    const { moduleName } = useParams();

    return (
        <main>
            <form className={styles.formulario}>
                <h1 className={styles.tituloFuncao}>Criar Função</h1>
                <div className={styles.nomesContainer}>
                    <h2 className={styles.nomeModulo}>{moduleName}</h2>
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