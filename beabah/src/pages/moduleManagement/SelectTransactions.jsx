import styles from "../../styles/moduleManagement/selectTransactions.module.css"

export function SelectTransactions () {
    return (
        <main>
            <form action="#" method="POST" className={styles.formulario}>
            <h1 className={styles.titulo}>Selecionar Transações</h1>
            <h2 className={styles.nomeModulo}>Nome do Módulo</h2>
            <div className={styles.opcoes}>
                <label><input type="checkbox" name="transacao" value="riskPrice" /> RKPC (Risk Price)</label>
                <label><input type="checkbox" name="transacao" value="produtoFatura" /> PRFA (Produto Fatura)</label>
                <label><input type="checkbox" name="transacao" value="descontoFolha" /> DEFO (Desconto em Folha)</label>
                <label><input type="checkbox" name="transacao" value="pessoaFisica" /> PEFI (Pessoa Física)</label>
                <label><input type="checkbox" name="transacao" value="pessoaJuridica" /> PEJU (Pessoa Jurídica)</label>
            </div>
            <button className={styles.associar}>Associar</button>
            </form>
        </main>
    )
}