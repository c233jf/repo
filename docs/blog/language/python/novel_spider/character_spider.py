import scrapy
from scrapy.http import Response
import re
from typing import TypedDict


class CharacterSpider(scrapy.Spider):
    """用于搜索角色在小说章节中出现的爬虫"""

    name = "character"

    def __init__(self, character_name: str, book_id: str, *args, **kwargs):
        super(CharacterSpider, self).__init__(*args, **kwargs)
        self.character_name = character_name
        self.book_id = book_id
        self.start_urls = [f"https://www.dxmwx.org/chapter/{book_id}.html"]
        self.custom_settings = {
            'ITEM_PIPELINES': {
                'character_spider.CharacterPipeline': 300,
            }
        }

    def parse(self, response: Response):
        """解析章节目录页面，提取所有章节链接"""
        # 提取小说标题
        novel_title = response.xpath(
            '/html/body/div/div[2]/div[2]/text()').get()
        if not novel_title:
            novel_title = "未知小说"

        # 提取所有章节链接和标题
        chapter_links = response.css('a[href*="/read/"]')

        for link in chapter_links:
            chapter_url = link.attrib.get('href')
            chapter_title = link.css('::text').get()

            if chapter_url and chapter_title:
                # 确保是完整的URL
                if not chapter_url.startswith('http'):
                    chapter_url = response.urljoin(chapter_url)

                # 发送请求到章节页面
                yield response.follow(
                    chapter_url,
                    self.parse_chapter,
                    meta={
                        'novel_title': novel_title,
                        'chapter_title': chapter_title.strip(),
                        'chapter_url': chapter_url
                    }
                )

    def parse_chapter(self, response: Response):
        """解析单个章节页面，检查是否包含指定角色"""
        novel_title = response.meta['novel_title']
        chapter_title = response.meta['chapter_title']
        chapter_url = response.meta['chapter_url']

        # 提取章节内容
        # 根据常见的小说网站结构，尝试多种选择器
        content_selectors = [
            'p[id*="txt_"] *::text',
        ]

        chapter_content = ""
        for selector in content_selectors:
            content_parts = response.css(selector).getall()
            if content_parts:
                chapter_content = ' '.join(content_parts)
                break

        # 如果没有找到内容，尝试获取所有文本
        if not chapter_content:
            chapter_content = ' '.join(response.css('*::text').getall())

        # 清理内容
        chapter_content = re.sub(r'\s+', ' ', chapter_content).strip()

        # 检查角色是否在章节中出现
        if self.character_name in chapter_content:
            # 统计出现次数
            appearance_count = chapter_content.count(self.character_name)

            # 提取角色出现的上下文（前后各50个字符）
            contexts = []
            start = 0
            while True:
                pos = chapter_content.find(self.character_name, start)
                if pos == -1:
                    break

                context_start = max(0, pos - 50)
                context_end = min(len(chapter_content), pos +
                                  len(self.character_name) + 50)
                context = chapter_content[context_start:context_end]
                contexts.append(context)

                start = context_end + 1

            yield {
                'novel_title': novel_title,
                'character_name': self.character_name,
                'chapter_title': chapter_title,
                'chapter_url': chapter_url,
                'appearance_count': appearance_count,
                'contexts': contexts[:3],  # 只保留前3个上下文
                'content_length': len(chapter_content)
            }


class ChapterItem(TypedDict):
    novel_title: str
    character_name: str
    chapter_title: str
    chapter_url: str
    appearance_count: int
    contexts: list[str]
    content_length: int


class CharacterPipeline:
    """处理角色搜索结果的管道"""

    def __init__(self):
        self.results: list[ChapterItem] = []

    def process_item(self, item: ChapterItem):
        self.results.append(item)

        # 打印结果到控制台
        print(f"\n=== 发现角色 '{item['character_name']}' ===")
        print(f"小说: {item['novel_title']}")
        print(f"章节: {item['chapter_title']}")
        print(f"出现次数: {item['appearance_count']}")
        print(f"章节链接: {item['chapter_url']}")

        if item['contexts']:
            print("上下文片段:")
            for i, context in enumerate(item['contexts'], 1):
                print(f"  {i}. ...{context}...")

        print("-" * 60)

        return item

    def close_spider(self, spider: CharacterSpider):
        """爬虫结束时的总结"""
        print(f"\n=== 搜索完成 ===")
        print(f"角色 '{spider.character_name}' 共在 {len(self.results)} 个章节中出现")

        if self.results:
            total_appearances = sum(item['appearance_count']
                                    for item in self.results)
            print(f"总出现次数: {total_appearances}")
            print("\n章节列表:")
            for i, item in enumerate(self.results, 1):
                print(
                    f"  {i}. {item['chapter_title']} (出现{item['appearance_count']}次)")
