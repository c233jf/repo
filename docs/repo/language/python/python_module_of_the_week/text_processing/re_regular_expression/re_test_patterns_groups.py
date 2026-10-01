import re


def test_patterns(text: str, patterns: list[tuple[str, str]]):
    for pattern, desc in patterns:
        print(f'Seeking pattern {pattern!r} -> {desc}')
        print(f'Text: {text!r}')

        for match in re.finditer(pattern, text):
            s = match.start()
            e = match.end()
            prefix = ' ' * s
            print(
                f'{prefix}{text[s:e]!r}{" " * (len(text) - e)}', end=' ')
            print(match.groups())
            if match.groupdict():
                print(f'{' ' * (len(text) - s)}{match.groupdict()}')

        print()
    return
