#!/usr/bin/env python3
"""
角色搜索功能演示脚本

这个脚本演示如何使用character_spider来搜索小说中的角色出现情况
"""

from character_spider import CharacterSpider, CharacterPipeline
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import asyncio


def demo_character_search():
    """演示角色搜索功能"""

    print("=== 小说角色搜索功能演示 ===\n")

    # 要搜索的角色列表
    characters_to_search = ["白凝冰", "方源", "古月"]
    book_id = "38127"  # 蛊真人的书籍ID

    print(f"目标小说ID: {book_id}")
    print(f"搜索角色: {', '.join(characters_to_search)}\n")

    for character in characters_to_search:
        print(f"开始搜索角色: {character}")
        print("-" * 40)

        # 配置爬虫设置
        settings = {
            'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'ROBOTSTXT_OBEY': False,
            'DOWNLOAD_DELAY': 2,  # 增加延迟以避免被反爬
            'RANDOMIZE_DOWNLOAD_DELAY': True,
            'CONCURRENT_REQUESTS': 1,
            'COOKIES_ENABLED': False,
            'RETRY_TIMES': 3,
            'RETRY_HTTP_CODES': [500, 502, 503, 504, 408, 429],
            'LOG_LEVEL': 'INFO',
            'ITEM_PIPELINES': {
                'character_spider.CharacterPipeline': 300,
            }
        }

        try:
            # 创建爬虫进程
            process = CrawlerProcess(settings)

            # 启动角色搜索爬虫
            process.crawl(
                CharacterSpider,
                character_name=character,
                book_id=book_id
            )

            # 开始爬取
            process.start()

        except Exception as e:
            print(f"搜索角色 '{character}' 时出错: {e}")

        print(f"\n角色 '{character}' 搜索完成\n")
        print("=" * 60)


def simple_search_example():
    """简单的搜索示例"""

    print("=== 简单搜索示例 ===")

    # 直接使用爬虫类
    settings = {
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'ROBOTSTXT_OBEY': False,
        'DOWNLOAD_DELAY': 1,
        'CONCURRENT_REQUESTS': 1,
        'LOG_LEVEL': 'ERROR',  # 只显示错误日志
    }

    process = CrawlerProcess(settings)

    # 搜索"白凝冰"这个角色
    process.crawl(
        CharacterSpider,
        character_name="白凝冰",
        book_id="38127"
    )

    process.start()


if __name__ == "__main__":
    import sys

    print("小说角色搜索工具")
    print("=" * 40)

    if len(sys.argv) > 1:
        if sys.argv[1] == "demo":
            demo_character_search()
        elif sys.argv[1] == "simple":
            simple_search_example()
        else:
            character_name = sys.argv[1]
            book_id = sys.argv[2] if len(sys.argv) > 2 else "38127"

            print(f"搜索角色: {character_name}")
            print(f"小说ID: {book_id}")

            settings = {
                'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'ROBOTSTXT_OBEY': False,
                'DOWNLOAD_DELAY': 1,
                'CONCURRENT_REQUESTS': 1,
            }

            process = CrawlerProcess(settings)
            process.crawl(CharacterSpider,
                          character_name=character_name, book_id=book_id)
            process.start()
    else:
        print("\n使用方法:")
        print("  python demo.py <角色名称> [小说ID]  - 搜索指定角色")
        print("  python demo.py demo                - 运行演示")
        print("  python demo.py simple              - 简单搜索示例")
        print("\n示例:")
        print("  python demo.py 白凝冰")
        print("  python demo.py 方源 38127")
        print("  python demo.py demo")
