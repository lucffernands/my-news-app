import sqlite3

DB_NAME = "users.db"

def get_connection():
    return sqlite3.connect(DB_NAME)

def init_db():
    """Inicializa o banco de dados e cria a tabela se não existir"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        topico TEXT,
        horario TEXT
    )
    """)
    conn.commit()
    conn.close()

def add_or_update_user(email, topico, horario):
    """Adiciona um usuário ou atualiza suas preferências"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO usuarios (email, topico, horario)
        VALUES (?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET topico=excluded.topico, horario=excluded.horario
    """, (email, topico, horario))
    conn.commit()
    conn.close()

def get_all_users():
    """Retorna todos os usuários com suas preferências"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT email, topico, horario FROM usuarios")
    rows = cursor.fetchall()
    conn.close()
    return rows
