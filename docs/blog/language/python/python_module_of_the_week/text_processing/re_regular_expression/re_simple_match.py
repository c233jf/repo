import re


pattern = 'this'
text = 'Does this text match the pattern?'

match = re.search(pattern, text)

if match:
    s = match.start()
    e = match.end()
    print(
        f'Found "{match.re.pattern}" in "{match.string}" from {s} to {e} ("{match.string[s:e]}")')
else:
    print('No match')
