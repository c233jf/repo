import re


address = re.compile(
    r'''

    # 正则名称
    (\w+)               # 名
    \s+
    (([\w.]+)\s+)?      # 可选的中间名或首字母
    (\w+)               # 姓

    \s+

    <

    # 地址： first_name.last_name@domain.tld
    (?P<email>
      \1               # 名
      \.
      \4               # 姓
      @
      ([\w\d.]+\.)+    # 域名前缀
      (com|org|edu)    # 限制允许的顶级域
    )

    >
    ''',
    re.VERBOSE | re.IGNORECASE)

candidates = [
    'First Last <first.last@example.com>',
    'Different Name <first.last@example.com>',
    'First Middle Last <first.last@example.com>',
    'First M. Last <first.last@example.com>',
]

for candidate in candidates:
    print('Candidate:', candidate)
    match = address.search(candidate)
    if match:
        print('  Match name :', match.group(1), match.group(4))
        print('  Match email:', match.group(5))
    else:
        print('  No match')
