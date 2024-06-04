import { useParams } from "react-router-dom"
import styles from "../../styles/profileManagement/createProfileTF.module.css"

export function CreateProfileTF () {
    const { profileName } = useParams();

    return (
        <main className={styles.container}>
            <h1 className={styles.titulo}>{profileName || 'Nome do Perfil'}</h1>
            <div className={styles.formularios}>
                <form action="#" method="POST" className={styles.formulario}>
                    <h2>Transações</h2>
                    <div className={styles.opcoes}>
                        <label htmlFor="rkpc"><input type="radio" id='rkpc' name='transacao' value="risk price"/> Risk Price</label>
                        <label htmlFor="prfa"><input type="radio" id='prfa' name='transacao' value="produto fatura"/> Produto Fatura</label>
                        <label htmlFor="defo"><input type="radio" id='defo' name='transacao' value="desconto em folha"/> Desconto em Folha</label>
                        <label htmlFor="pefi"><input type="radio" id='pefi' name='transacao' value="pessoa fisica"/> Pessoa Física</label>
                        <label htmlFor="peju"><input type="radio" id='peju' name='transacao' value="pessoa juridica"/> Pessoa Jurídica</label>
                    </div>
                </form>
                <form action="#" method="POST" className={styles.formulario}>
                    <h2>Funções</h2>
                    <div className={styles.opcoes}>
                    <label><input type="checkbox" name="funcao" value="adicionar" /> ADAT (Adicionar)</label>
                    <label><input type="checkbox" name="funcao" value="alterar" /> ALTR (Alterar)</label>
                    <label><input type="checkbox" name="funcao" value="visualizar" /> RETR (Visualizar)</label>
                    <label><input type="checkbox" name="funcao" value="addRestricao" /> ADIC (Adicionar Restrição)</label>
                    </div>
                </form>
            </div>
            <button className={styles.criar}>Criar</button>
        </main>
    )
}