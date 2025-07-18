import functools
import logging
import time
import typing


logging.basicConfig()
log = logging.getLogger('retry')


def retry(f: typing.Callable[[str], None]):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        MAX_ATTEMPTS = 5
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                return f(*args, **kwargs)
            except:
                log.exception('Attempt %s/%s failed: %s', attempt,
                              MAX_ATTEMPTS, (args, kwargs))
                time.sleep(10 * attempt)
        log.critical('All %s attempts failed: %s',
                     MAX_ATTEMPTS, (args, kwargs))
    return wrapper


counter = 0


@retry
def save_to_database(arg: str):
    print('Write to a database or make a network call or etc.')
    print('This will be automatically retried if exception is thrown.')
    global counter
    counter += 1
    # 这将在第一次调用中抛出异常
    # 并且在第二次调用中工作正常（即重试）
    if counter < 2:
        raise ValueError(arg)


if __name__ == "__main__":
    save_to_database('Some bad value')
