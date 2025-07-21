import re


address = re.compile(r'[\w\d.+-]+@([\w\d.]+\.)+(com|org|edu)')

condidates = [
    u'first.last@example.com',
    u'first.last+category@gmail.com',
    u'valid-address@mail.example.com',
    u'not-valid@example.foo',
]

for candidate in condidates:
    match = address.search(candidate)
    print(f'{candidate:<30}  {"Matches" if match else "No match"}')
