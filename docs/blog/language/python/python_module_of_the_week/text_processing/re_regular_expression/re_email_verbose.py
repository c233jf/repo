import re


address = re.compile(
    r'''
    [\w\d.+-]+       # 用户名
    @
    ([\w\d.]+\.)+    # 域名前缀
    (com|org|edu)    # 待办事项：支持更高级的域
    ''',
    re.VERBOSE)

candidates = [
    u'first.last@example.com',
    u'first.last+category@gmail.com',
    u'valid-address@mail.example.com',
    u'not-valid@example.foo',
]

for candidate in candidates:
    match = address.search(candidate)
    print(f'{candidate:<30}  {"Matches" if match else "No match"}')
