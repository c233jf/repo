import sqlite3
import sys


db_filename = 'todo.db'
project_name = sys.argv[1]

with sqlite3.connect(db_filename) as conn:
    cursor = conn.cursor()

    query = 'SELECT id, priority, details, status, deadline FROM task WHERE project = ?'
    cursor.execute(query, (project_name,))
    for row in cursor.fetchall():
        task_id, priority, details, status, deadline = row
        print(
            f'{task_id:2d} [{priority:d}] {details:<25} [{status:<8}] ({deadline})')
