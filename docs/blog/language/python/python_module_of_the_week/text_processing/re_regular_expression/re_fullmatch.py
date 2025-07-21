import re


text = 'This is some text -- with punctuation.'
pattern = 'is'

print(f'Text: {text}')
print(f'Pattern: {pattern}')

m = re.fullmatch(pattern, text)
print(f'Full match: {m}')
s = re.search(pattern, text)
print(f'Search: {s}')
