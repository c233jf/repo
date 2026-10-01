import os


PATHS = [
    'one//two//three',
    'one/./two/./three',
    'one/../alt/two/three',
]

for path in PATHS:
    print('{!r:>21} : {!r}'.format(path, os.path.normpath(path)))
