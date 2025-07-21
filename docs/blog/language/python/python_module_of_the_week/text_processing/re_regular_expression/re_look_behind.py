import re


twitter = re.compile(
    r'''
    # 一个 twitter 句柄： @username
    (?<=@)
    ([\w\d_]+)       # 用户名
    ''',
    re.VERBOSE)

text = '''This text includes two Twitter handles.
One for @ThePSF, and one for the author, @doughellmann.
'''

print(text)
for match in twitter.findall(text):
    print('Handle:', match)
