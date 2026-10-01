import pathlib
import time


p = pathlib.Path('touched')
if p.exists():
    print('already exists')
else:
    print('creating new')

p.touch()
start = p.stat()

time.sleep(1)

p.touch()
end = p.stat()

print('start :', time.ctime(start.st_mtime))
print('end   :', time.ctime(end.st_mtime))
