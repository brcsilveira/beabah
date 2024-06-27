from sqlalchemy import create_engine

DATABASE_TYPE = 'postgresql'
DBAPI = 'psycopg2'
ENDPOINT = 'localhost'
USER = 'postgres'
PASSWORD = 'postgres'
PORT = 5432
DATABE = 'postgres'

# String de conexão
DATABASE_URI = f'{DATABASE_TYPE}+{DBAPI}://{USER}:{PASSWORD}@{ENDPOINT}:{PORT}/{DATABE}'
engine = create_engine(DATABASE_URI)