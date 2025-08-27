import contextlib


class Tracker:
    "用于提醒上下文信息的基础类"

    def __init__(self, i: int):
        self.i = i

    def msg(self, s: str):
        print(f'  {self.__class__.__name__}({self.i}): {s}')

    def __enter__(self):
        self.msg('entering')


class HandleError(Tracker):
    "处理任何接收到的异常."

    def __exit__(self, *exc_details):
        received_exc = exc_details[1] is not None
        if received_exc:
            self.msg(f'handling exception {exc_details[1]!r}')
        self.msg(f'exiting {received_exc}')
        # 返回布尔类型的值代表是否已经处理了该异常。
        return received_exc


class PassError(Tracker):
    "传递任何接收到的异常。"

    def __exit__(self, *exc_details):
        received_exc = exc_details[1] is not None
        if received_exc:
            self.msg(f'passing exception {exc_details[1]!r}')
        self.msg('exiting')
        # 返回False，表示没有处理这个异常。
        return False


class ErrorOnExit(Tracker):
    "抛出个异常"

    def __exit__(self, *exc_details):
        self.msg('throwing error')
        raise RuntimeError(f'from {self.i}')


class ErrorOnEnter(Tracker):
    "抛出个异常."

    def __enter__(self):
        self.msg('throwing error on enter')
        raise RuntimeError(f'from {self.i}')

    def __exit__(self, *exc_info):
        self.msg('exiting')
