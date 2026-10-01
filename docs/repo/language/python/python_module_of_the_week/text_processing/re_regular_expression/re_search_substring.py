import re


text = 'This is some text -- with punctuation.'
pattern = re.compile(r'\b\w*is\w*\b')

print(f'Text: {text}')
print()

pos = 0
while True:
    match = pattern.search(text, pos)
    if not match:
        break
    s = match.start()
    e = match.end()
    print(f'  {s:>2d} : {e - 1:>2d} = "{text[s:e]}"')
    pos = e
