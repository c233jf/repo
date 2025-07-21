import re


text = 'This is some text -- with punctuation.'

print(f'Text: {text}')
print()

patterns = [
    (r'^(\w+)', 'word at start of string'),
    (r'(\w+)\S*$', 'word at end, with optional punctuation'),
    (r'(\bt\w+)\W+(\w+)', 'word starting with t, another word'),
    (r'(\w+t)\b', 'word ending with t'),
]

for pattern, desc in patterns:
    regex = re.compile(pattern)
    match = regex.search(text)
    print(f'Pattern "{pattern}" ({desc})')
    print(f'  Match: {match.groups()}')
    print()
