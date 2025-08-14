import queue
import threading
import urllib.request
from urllib.parse import urlparse
import feedparser


# 定义一些全局变量
num_fetch_threads = 2
enclosure_queue = queue.Queue()

# 真实场景不会使用硬编码数据。
feed_urls = [
    'http://talkpython.fm/episodes/rss',
]


def message(s: str):
    print(f'{threading.current_thread().name}: {s}')


def download_enclosure(q: queue.Queue):
    """
          本函数是一个工作线程函数。
          本函数会不断处理从队列中取出的数据。
          这些守护线程会被放入一个无限循环中，只有当主线程结束时才会退出。
      """
    while True:
        message('Looking for the next enclosure')
        url: str = q.get()
        filename = url.rpartition('/')[-1]
        message(f'Downloading: {url}')
        response = urllib.request.urlopen(url)
        data = response.read()
        # 将所下载的文件保存在当前目录中
        message(f'Writing to: {filename}')
        with open(filename, 'wb') as f:
            f.write(data)
        q.task_done()


# 设置一些线程来获取广播数据
for i in range(num_fetch_threads):
    worker = threading.Thread(target=download_enclosure, args=(
        enclosure_queue,), name=f'worker-{i}')
    worker.daemon = True
    worker.start()


# 下载源的内容并将其中的 URL 塞入队列。
for url in feed_urls:
    response = feedparser.parse(url, agent='fetch_podcasts.py')
    for entry in response['entries'][:5]:
        for enclosure in entry.get('enclosures', []):
            parsed_url = urlparse(enclosure['url'])
            message(f'Queuing {parsed_url.path.rpartition('/')[-1]}')
            enclosure_queue.put(enclosure['url'])


# 等待队列被榨干，也就是我们已经下载了所有要下载的东西。
message('*** main thread waiting')
enclosure_queue.join()
message('*** done')
