import pathlib


p = pathlib.PurePosixPath('/usr/local/lib')
print('parent: {}'.format(p.parent))

print('\nhierachy:')
for up in p.parents:
    print(up)
