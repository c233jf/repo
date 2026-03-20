import sqlite3


db_filename = 'todo.db'


def show_projects(conn: sqlite3.Connection):
    cursor = conn.cursor()
    cursor.execute(
        'select name, description from project')
    for name, desc in cursor.fetchall():
        print('  ', name)


with sqlite3.connect(db_filename) as conn:
    print('Before changes:')
    show_projects(conn)
