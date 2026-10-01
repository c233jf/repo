import contextlib
from contextlib_context_managers import ErrorOnExit, HandleError, PassError


def variable_stack(managers):
    with contextlib.ExitStack() as stack:
        for m in managers:
            stack.enter_context(m)


print('No errors:')
variable_stack([
    HandleError(1),
    PassError(2),
])

print('\nError at the end of the context stack:')
variable_stack([
    HandleError(1),
    HandleError(2),
    ErrorOnExit(3),
])

print('\nError in the middle of the context stack:')
variable_stack([
    HandleError(1),
    PassError(2),
    ErrorOnExit(3),
    HandleError(4),
])

try:
    print('\nError ignored:')
    variable_stack([
        PassError(1),
        ErrorOnExit(2),
    ])
except RuntimeError:
    print('error handled outside of context')
