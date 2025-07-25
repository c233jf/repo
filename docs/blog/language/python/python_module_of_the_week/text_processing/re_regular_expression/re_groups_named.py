import re


text = 'This is some text -- with punctuation.'

print(f'Text: {text}')
print()

patterns = [
    r'^(?P<first_word>\w+)',
    r'(?P<last_word>\w+)\S*$',
    r'(?P<t_word>\bt\w+)\W+(?P<other_word>\w+)',
    r'(?P<ends_with_t>\w+t)\b',
]

for pattern in patterns:
    regex = re.compile(pattern)
    match = regex.search(text)
    print(f"'{pattern}'")
    print('  ', match.groups())
    print('  ', match.groupdict())
    print()
