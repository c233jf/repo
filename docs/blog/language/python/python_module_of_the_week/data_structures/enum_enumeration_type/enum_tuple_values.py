import enum


class BugStatus(enum.Enum):
    new = (7, ['incomplete', 'invalid', 'wont_fix'])
    incomplete = (6, ['new'])
    invalid = (5, ['new'])
    wont_fix = (4, ['new'])
    in_progress = (3, ['new', 'fix_committed'])
    fix_committed = (2, ['in_progress', 'fix_released'])
    fix_released = (1, ['new'])

    def __init__(self, num: int, transitions: list[str]):
        self.num = num
        self.transitions = transitions

    def can_transition(self, new_state: 'BugStatus') -> bool:
        return new_state.name in self.transitions


print('Name:', BugStatus.in_progress)
print('Value:', BugStatus.in_progress.value)
print('Custom attribute:', BugStatus.in_progress.transitions)
print('Using attribute:',
      BugStatus.in_progress.can_transition(BugStatus.new))
