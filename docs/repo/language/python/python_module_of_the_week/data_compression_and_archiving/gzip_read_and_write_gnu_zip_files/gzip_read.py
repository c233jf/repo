import gzip
import io


with gzip.open('example.txt.gz', 'rb') as f:
    with io.TextIOWrapper(f, encoding='utf-8') as wrapper:
        print(wrapper.read())
