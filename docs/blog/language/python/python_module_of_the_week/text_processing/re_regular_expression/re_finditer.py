import re


text = 'abbaaabbbbaaaaa'

pattern = 'ab'

for match in re.finditer(pattern, text):
    s = match.start()
    e = match.end()
    print(
        f'Found {match.re.pattern!r} in {match.string!r} from {s} to {e} ("{match.string[s:e]}")')
