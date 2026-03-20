import sqlite3


db_filename = 'todo.db'

with sqlite3.connect(db_filename) as conn:
    # 修改行工厂为 Row
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(
        'SELECT name, description, deadline FROM project WHERE name = ?', ('pymotw',))
    name, description, deadline = cursor.fetchone()
    print(f'Project details for {name} ({description})\n  due {deadline}')

    cursor.execute(
        'SELECT id, priority, details, status, deadline FROM task WHERE project = ? ORDER BY deadline', ('pymotw',))
    print('\nNext 5 tasks:')
    for row in cursor.fetchmany(5):
        print(
            f'{row["id"]:2d} [{row["priority"]:d}] {row["details"]:<25} [{row["status"]:<8}] ({row["deadline"]})')
