import sys
import pandas as pd
from db_config import engine
import os

def get_users_report():
    query = "SELECT * FROM beabah.usuario"
    df = pd.read_sql(query, engine)
    return df

def get_profiles_report():
    query = "SELECT * FROM beabah.perfil"
    df = pd.read_sql(query, engine)
    return df

def get_modules_report():
    query = "SELECT * FROM beabah.modulos"
    df = pd.read_sql(query, engine)
    return df

def get_transactions_report():
    query = "SELECT * FROM beabah.transacoes"
    df = pd.read_sql(query, engine)
    return df

def get_functions_report():
    query = "SELECT * FROM beabah.funcoes"
    df = pd.read_sql(query, engine)
    return df

def save_report(report_type):
    report_map = {
        'users_report': get_users_report,
        'profiles_report': get_profiles_report,
        'modules_report': get_modules_report,
        'transactions_report': get_transactions_report,
        'functions_report': get_functions_report,
    }

    if report_type in report_map:
        df = report_map[report_type]()
        output_dir = os.path.join(os.path.dirname(__file__), report_type + '.csv')
        df.to_csv(output_dir, index=False)
        print(f"{report_type} gerado com sucesso!")
    else:
        print(f"Tipo de relatório {report_type} inválido")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Uso: python report_generator.py <tipo_de_relatorio>")
    else:
        save_report(sys.argv[1])