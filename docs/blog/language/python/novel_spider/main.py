from character_spider import CharacterSpider


def search_character_in_novel(character_name: str, book_id: str):
    """
    搜索角色在小说中的出现，并以 json 文件输出结果

    Args:
        character_name: 角色名称
        book_id: 小说ID
    """
    from scrapy.crawler import CrawlerProcess

    # 配置爬虫设置
    settings = {
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:141.0) Gecko/20100101 Firefox/141.0',
        'ROBOTSTXT_OBEY': False,
        'DOWNLOAD_DELAY': 1,
        'RANDOMIZE_DOWNLOAD_DELAY': True,
        'CONCURRENT_REQUESTS': 1,
        'COOKIES_ENABLED': False,
        # 指定输出为 json 文件
        'FEEDS': {
            f'character_{character_name}_{book_id}.json': {
                'format': 'json',
                'encoding': 'utf8',
                'store_empty': False,
                'fields': None,
                'indent': 2,
            }
        }
    }

    # 创建爬虫进程
    process = CrawlerProcess(settings)

    # 添加角色搜索爬虫
    process.crawl(CharacterSpider,
                  character_name=character_name, book_id=book_id)

    # 开始爬取
    process.start()

    print(f"结果已保存为: character_{character_name}_{book_id}.json")


if __name__ == "__main__":
    import sys

    if len(sys.argv) == 3:
        character_name = sys.argv[1]
        book_id = sys.argv[2]
        print(f"搜索角色: {character_name}")
        search_character_in_novel(character_name, book_id)
    else:
        print("使用方法: python main.py <角色名称> <小说ID>")
        print("示例: python main.py 白凝冰 38127")
