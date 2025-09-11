import os


for user in ['', 'vagrant', 'nosuchuser']:
    lookup = '~' + user
    print('{!r:>15} : {!r}'.format(lookup, os.path.expanduser(lookup)))
