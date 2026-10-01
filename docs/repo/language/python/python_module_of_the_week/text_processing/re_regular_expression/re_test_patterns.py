import re


def test_patterns(text: str, patterns: list[tuple[str, str]]):
    for pattern, desc in patterns:
        print(f'Seeking pattern "{pattern}" -> {desc}')
        print(f'Text: "{text}"')

        for match in re.finditer(pattern, text):
            s = match.start()
            e = match.end()
            substr = text[s:e]
            n_backslashes = text[:s].count('\\')
            prefix = '.' * (s + n_backslashes)
            print(
                f'{prefix}"{substr}"')

        print()
    return


if __name__ == '__main__':
    test_patterns(
        'abbaaabbbbaaaaa',
        [
            ('ab', "'a' followed by 'b'"),
        ]
    )
