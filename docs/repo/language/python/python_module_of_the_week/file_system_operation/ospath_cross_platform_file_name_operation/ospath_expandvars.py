import os


os.environ['MYVAR'] = 'MYVALUE'
print(os.path.expandvars('$MYVAR'))
