import re


text = '''Paragraph one
on two lines.

Paragraph two.

Paragraph three.
'''


for num, para in enumerate(re.findall(r'(.+?)\n{2,}', text, re.DOTALL)):
    print(num, repr(para))
