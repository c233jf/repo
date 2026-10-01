import enum
from typing import TypedDict


class BugStatusValues(TypedDict):
    num: int
    transitions: list[str]


class BugStatus(enum.Enum):
    new = {
        'num': 7,
        'transitions': ['incomplete', 'invalid', 'wont_fix']
    }
    incomplete = {
        'num': 6,
        'transitions': ['new']
    }
    invalid = {
        'num': 5,
        'transitions': ['new']
    }
    wont_fix = {
        'num': 4,
        'transitions': ['new']
    }
    in_progress = {
        'num': 3,
        'transitions': ['new', 'fix_committed']
    }
    fix_committed = {
        'num': 2,
        'transitions': ['in_progress', 'fix_released']
    }
    fix_released = {
        'num': 1,
        'transitions': ['new']
    }

    def __init__(self, vals: BugStatusValues):
        self.num = vals['num']
        self.transitions = vals['transitions']

    def can_transition(self, new_state: 'BugStatus') -> bool:
        return new_state.name in self.transitions


print('Name:', BugStatus.in_progress)
print('Value:', BugStatus.in_progress.value)
print('Custom attribute:', BugStatus.in_progress.transitions)
print('Using attribute:',
      BugStatus.in_progress.can_transition(BugStatus.new))
