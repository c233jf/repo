import pickle
import sqlite3


db_filename = 'todo.db'


def adapter_func(obj):
    """从内存转换对象为可存储"""

    print(f'adapter_func({obj})\n')
    return pickle.dumps(obj)


def converter_func(data):
    """从存储数据中转换为内存中的对象"""

    print(f'converter_func({data!r})\n')
    return pickle.loads(data)


class MyObj:

    def __init__(self, arg):
        self.arg = arg

    def __str__(self):
        return f'MyObj({self.arg!r})'


# 注册函数控制字段类型
sqlite3.register_adapter(MyObj, adapter_func)
sqlite3.register_converter('MyObj', converter_func)

# 创建需要保存的一些对象。使用包含一系列元组
# 的列表便于直接传入 executemany()函数。
to_save = [
    (MyObj('this is a value to save'),),
    (MyObj(42),),
]

with sqlite3.connect(db_filename, detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    # 创建一个表包含 "MyObj" 的字段类型
    conn.execute("""
    create table if not exists obj (
        id    integer primary key autoincrement not null,
        data  MyObj
    )
    """)
    cursor = conn.cursor()

    # 在数据库中插入对象
    cursor.executemany("insert into obj (data) values (?)",
                       to_save)

    # 查询刚刚插入的结果
    cursor.execute("select id, data from obj")
    for obj_id, obj in cursor.fetchall():
        print('Retrieved', obj_id, obj)
        print('  with type', type(obj))
        print()
