import re


address = re.compile(
    r'''

    # 名字是由字母组成的，包含 ０ 个或多个「 . 」
    # 表示标题缩写和中间首字母
    ((?P<name>
       ([\w.,]+\s+)*[\w.,]+)
       \s*
       # 电子邮件地址被封装在尖括号< >中，
       # 但是只有在找到一个名字时如此，
       # 所以请在该组中保留起始括号。
       <
    )? # 整个名字是可选的

    #地址本身： username@domain.tld
    (?P<email>
      [\w\d.+-]+       # 用户名
      @
      ([\w\d.]+\.)+    # 域名前缀
      (com|org|edu)    # 限制允许的顶级域
    )

    >? # 可选的闭合尖括号
    ''',
    re.VERBOSE)

candidates = [
    u'first.last@example.com',
    u'first.last+category@gmail.com',
    u'valid-address@mail.example.com',
    u'not-valid@example.foo',
    u'First Last <first.last@example.com>',
    u'No Brackets first.last@example.com',
    u'First Last',
    u'First Middle Last <first.last@example.com>',
    u'First M. Last <first.last@example.com>',
    u'<first.last@example.com>',
]

for candidate in candidates:
    print('Candidate:', candidate)
    match = address.search(candidate)
    if match:
        print('  Name :', match.groupdict()['name'])
        print('  Email:', match.groupdict()['email'])
    else:
        print('  No match')
