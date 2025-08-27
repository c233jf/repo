import contextlib
import io
import sys


def misbehaving_function(a: int):
    sys.stdout.write(f'(stdout) A: {a!r}\n')
    sys.stderr.write(f'(stderr) A: {a!r}\n')


capture = io.StringIO()
with contextlib.redirect_stdout(capture), contextlib.redirect_stderr(capture):
    misbehaving_function(42)

print(capture.getvalue())
