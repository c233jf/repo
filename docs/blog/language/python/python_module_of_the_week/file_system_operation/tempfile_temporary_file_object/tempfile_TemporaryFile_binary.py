import tempfile


with tempfile.TemporaryFile() as temp:
    temp.write(b'Hello, World!')
    temp.seek(0)
    print(temp.read())
