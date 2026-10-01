import gzip
import io
import os


outfilename = 'example.txt.gz'

with gzip.open(outfilename, 'wb') as outfile:
    with io.TextIOWrapper(outfile, encoding='utf-8') as wrapper:
        wrapper.write('Contents of the example file go here.\n')

print(outfilename, 'contains', os.stat(outfilename).st_size, 'bytes')
os.system(f'file -b --mime {outfilename}')
