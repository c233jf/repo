import re


address = re.compile(
    r'''

    # 正则名称
    (?P<first_name>\w+)
    \s+
    (([\w.]+)\s+)?      # 可选的中间名或首字母
    (?P<last_name>\w+)

    \s+

    <

    # 地址： first_name.last_name@domain.tld
    (?P<email>
      (?P=first_name)
      \.
      (?P=last_name)
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
        print('  Match name :', match.groupdict()['first_name'],
              end=' ')
        print(match.groupdict()['last_name'])
        print('  Match email:', match.groupdict()['email'])
    else:
        print('  No match')
