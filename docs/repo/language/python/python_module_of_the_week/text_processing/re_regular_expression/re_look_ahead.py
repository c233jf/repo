import re


address = re.compile(
    r'''
    # 名字是由字母组成的，包含 0 个或多个「 . 」
    # 表示标题缩写和中间首字母
    ((?P<name>
       ([\w.,]+\s+)*[\w.,]+
     )
     \s+
    ) # 名字不再是可选的

    # 向前看
    # 电子邮件地址被封装在尖括号中，但是只有
    # 在尖括号都存在或者都不存在时才如此
    (?= (<.*>$)       # 用尖括号括起来的剩余部分
        |
        ([^<].*[^>]$) #  *不用* 尖括号括起来的剩余部分
      )

    <? # 可选的左尖括号

    # 地址本身： username@domain.tld
    (?P<email>
      [\w\d.+-]+       # 用户名
      @
      ([\w\d.]+\.)+    # 域名前缀
      (com|org|edu)    # 限制允许的顶级域
    )

    >? # 可选的右尖括号
    ''',
    re.VERBOSE)

candidates = [
    'First Last <first.last@example.com>',
    'No Brackets first.last@example.com',
    'Open Bracket <first.last@example.com',
    'Close Bracket first.last@example.com>',
]

for candidate in candidates:
    print('Candidate:', candidate)
    match = address.search(candidate)
    if match:
        print('  Name :', match.groupdict()['name'])
        print('  Email:', match.groupdict()['email'])
    else:
        print('  No match')
