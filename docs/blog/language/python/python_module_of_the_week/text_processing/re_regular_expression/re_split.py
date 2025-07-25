import re


text = '''Paragraph one
on two lines.

Paragraph two.

Paragraph three.
'''


print('With findall:')
for num, para in enumerate(re.findall(r'(.+?)(\n{2,}|$)', text, re.DOTALL)):
    print(num, repr(para))

print()
print('With split:')
for num, para in enumerate(re.split(r'\n{2,}', text)):
    print(num, repr(para))
