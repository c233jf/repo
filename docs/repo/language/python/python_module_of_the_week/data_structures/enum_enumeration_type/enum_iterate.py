from bug_status import BugStatus


for status in BugStatus:
    print(f'{status.name:15} = {status.value}')
