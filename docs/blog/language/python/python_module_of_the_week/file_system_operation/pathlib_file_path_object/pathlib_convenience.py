import pathlib


home = pathlib.Path.home()
print('home: {}'.format(home))

cwd = pathlib.Path.cwd()
print('cwd : ', cwd)
