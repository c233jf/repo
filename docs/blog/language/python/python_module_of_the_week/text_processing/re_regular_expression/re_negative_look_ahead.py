import re


address = re.compile(
    r'''
    ^

    # 一个地址: username@domain.tld

    # 忽略 noreply 地址
    (?!noreply@.*$)

    [\w\d.+-]+       # 用户名
    @
    ([\w\d.]+\.)+    # 域名前缀
    (com|org|edu)    # 限制允许的顶级域

    $
    ''',
    re.VERBOSE)

candidates = [
    'first.last@example.com',
    'noreply@example.com',
]

for candidate in candidates:
    print('Candidate:', candidate)
    match = address.search(candidate)
    if match:
        print('  Match:', candidate[match.start():match.end()])
    else:
        print('  No match')
