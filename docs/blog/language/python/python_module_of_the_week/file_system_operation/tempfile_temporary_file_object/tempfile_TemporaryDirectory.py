import pathlib
import tempfile


with tempfile.TemporaryDirectory() as tmpdirname:
    the_dir = pathlib.Path(tmpdirname)
    print(the_dir)
    a_file = the_dir / 'a_file.txt'
    a_file.write_text('This file is deleted.')

print('Directory exists after?', the_dir.exists())
print('Contents after:', list(the_dir.glob('*')))
