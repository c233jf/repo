import copy
import functools


@functools.total_ordering
class MyClass:

    def __init__(self, name: str):
        self.name = name

    def __eq__(self, other: "MyClass") -> bool:
        return self.name == other.name

    def __gt__(self, other: "MyClass") -> bool:
        return self.name > other.name

    def __copy__(self):
        print('__copy__()')
        return MyClass(self.name)

    def __deepcopy__(self, memo: dict) -> "MyClass":
        print(f'__deepcopy__({memo})')
        return MyClass(copy.deepcopy(self.name, memo))


a = MyClass('a')
sc = copy.copy(a)
dc = copy.deepcopy(a)
