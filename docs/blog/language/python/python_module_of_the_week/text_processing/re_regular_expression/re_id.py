import re


address = re.compile(
    r'''
    ^

    # 名字是由字母组成的，包含 0 个或多个「 . 」
    # 表示标题缩写和中间首字母。
    (?P<name>
       ([\w.]+\s+)*[\w.]+
     )?
    \s*

    # 电子邮件地址被封装在尖括号中，
    # 但是只有在找到一个名字时如此。
    (?(name)
      # 剩余部分被封装在尖括号中
      # 因为此处有一个名字
      (?P<brackets>(?=(<.*>$)))
      |
      # 没有名字的剩余部分不含有尖括号
      (?=([^<].*[^>]$))
     )

    # 只有在前向查看断言找到成对的括号时，
    # 才算找到一个括号。
    (?(brackets)<|\s*)

    # 地址本身： username@domain.tld
    (?P<email>
      [\w\d.+-]+       # 用户名
      @
      ([\w\d.]+\.)+    # 域名前缀
      (com|org|edu)    # 限制允许的顶级域
     )

    # 只有在前向查看断言找到成对的括号时，
    # 才算找到一个括号。
    (?(brackets)>|\s*)

    $
    ''',
    re.VERBOSE)

candidates = [
    'First Last <first.last@example.com>',
    'No Brackets first.last@example.com',
    'Open Bracket <first.last@example.com',
    'Close Bracket first.last@example.com>',
    'no.brackets@example.com',
]

for candidate in candidates:
    print('Candidate:', candidate)
    match = address.search(candidate)
    if match:
        print('  Match name :', match.groupdict()['name'])
        print('  Match email:', match.groupdict()['email'])
    else:
        print('  No match')
