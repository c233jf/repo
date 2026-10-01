import gzip
import io
import itertools
import os


with gzip.open('example_lines.txt.gz', 'wb') as f:
    with io.TextIOWrapper(f, encoding='utf-8') as wrapper:
        wrapper.writelines(itertools.repeat('Hello world\n', 10))

os.system('gzcat example_lines.txt.gz')
