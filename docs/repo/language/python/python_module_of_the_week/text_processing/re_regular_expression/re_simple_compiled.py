# 预编译正则表达式
import re


regexes = [
    re.compile(p)
    for p in ['this', 'that']
]

text = 'Does this text match the pattern?'

for regex in regexes:
    print(f'Seeking "{regex.pattern}" ->', end=' ')
    if regex.search(text):
        print('match')
    else:
        print('no match')
