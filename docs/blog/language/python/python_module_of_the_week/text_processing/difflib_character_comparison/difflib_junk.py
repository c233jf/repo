import difflib


def show_results(match: difflib.Match):
    print('  a    = {}'.format(match.a))
    print('  b    = {}'.format(match.b))
    print('  size = {}'.format(match.size))
    i, j, k = match
    print('  A[a:a+size] = {!r}'.format(A[i:i + k]))
    print('  B[b:b+size] = {!r}'.format(B[j:j + k]))


A = " abcd"
B = "abcd abcd"


print(f'A = {A!r}')
print(f'B = {B!r}')


print('\nWithout junk detection:')
s1 = difflib.SequenceMatcher(None, A, B)
match1 = s1.find_longest_match(0, len(A), 0, len(B))
show_results(match1)

print('\nTreat spaces as junk:')
s2 = difflib.SequenceMatcher(lambda x: x == ' ', A, B)
match2 = s2.find_longest_match(0, len(A), 0, len(B))
show_results(match2)
