import pickle
import sys


class SimpleObject:

    def __init__(self, name: str):
        self.name = name
        l = list(name)
        l.reverse()
        self.name_backwards = ''.join(l)


if __name__ == '__main__':
    data: list[SimpleObject] = []
    data.append(SimpleObject('pickle'))
    data.append(SimpleObject('cPickle'))
    data.append(SimpleObject('last'))

    filename = sys.argv[1]

    with open(filename, 'wb') as out_s:
        for o in data:
            print(f'WRITING: {o.name} ({o.name_backwards})')
            pickle.dump(o, out_s)
