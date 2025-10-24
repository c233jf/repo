import pickle


class State:

    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return f'State({self.__dict__!r})'


class MyClass:

    def __init__(self, name: str):
        print(f'MyClass.__init__({name})')
        self._set_name(name)

    def _set_name(self, name: str):
        self.name = name
        self.computed = name[::-1]

    def __repr__(self):
        return f'MyClass({self.name!r}, computed={self.computed!r})'

    def __getstate__(self):
        state = State(self.name)
        print(f'__getstate__ -> {state!r}')
        return state

    def __setstate__(self, state: State):
        print(f'__setstate__({state!r})')
        self._set_name(state.name)


inst = MyClass('name')
print('Before:', inst)

dumped = pickle.dumps(inst)

reloaded = pickle.loads(dumped)
print('After:', reloaded)
