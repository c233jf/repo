#!/usr/bin/env python3
"""
测试角色搜索功能的脚本

这个脚本用于快速测试character_spider是否能够正常工作
"""

import sys
import os
from pathlib import Path

# 添加当前目录到Python路径
sys.path.insert(0, str(Path(__file__).parent))

try:
    from character_spider import CharacterSpider, CharacterPipeline
    print("✓ 成功导入character_spider模块")
except ImportError as e:
    print(f"✗ 导入character_spider失败: {e}")
    sys.exit(1)

try:
    import scrapy
    from scrapy.http import Response
    from scrapy.crawler import CrawlerProcess
    print("✓ Scrapy环境检查通过")
except ImportError as e:
    print(f"✗ Scrapy环境检查失败: {e}")
    print("请安装scrapy: pip install scrapy")
    sys.exit(1)


def test_spider_initialization():
    """测试爬虫初始化"""
    print("\n=== 测试爬虫初始化 ===")

    try:
        spider = CharacterSpider(character_name="白凝冰", book_id="38127")
        print(f"✓ 爬虫初始化成功")
        print(f"  - 角色名称: {spider.character_name}")
        print(f"  - 小说ID: {spider.book_id}")
        print(f"  - 起始URL: {spider.start_urls}")
        return True
    except Exception as e:
        print(f"✗ 爬虫初始化失败: {e}")
        return False


def test_pipeline():
    """测试Pipeline"""
    print("\n=== 测试Pipeline ===")

    try:
        pipeline = CharacterPipeline()

        # 模拟测试数据
        test_item = {
            'novel_title': '蛊真人',
            'character_name': '白凝冰',
            'chapter_title': '第十三节：测试章节',
            'chapter_url': 'https://test.com/chapter/1.html',
            'appearance_count': 2,
            'contexts': ['...测试上下文1...', '...测试上下文2...'],
            'content_length': 1000
        }

        # 创建模拟spider
        class MockSpider:
            character_name = "白凝冰"

        result = pipeline.process_item(test_item, MockSpider())
        print("✓ Pipeline测试通过")
        return True

    except Exception as e:
        print(f"✗ Pipeline测试失败: {e}")
        return False


def test_settings():
    """测试爬虫设置"""
    print("\n=== 测试爬虫设置 ===")

    try:
        settings = {
            'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'ROBOTSTXT_OBEY': False,
            'DOWNLOAD_DELAY': 1,
            'CONCURRENT_REQUESTS': 1,
            'LOG_LEVEL': 'ERROR',
        }

        process = CrawlerProcess(settings)
        print("✓ 爬虫设置配置成功")
        return True

    except Exception as e:
        print(f"✗ 爬虫设置配置失败: {e}")
        return False


def run_quick_test():
    """运行快速测试（不实际爬取）"""
    print("\n=== 运行快速功能测试 ===")

    try:
        # 测试URL构建
        spider = CharacterSpider(character_name="方源", book_id="12345")
        expected_url = "https://www.dxmwx.org/chapter/12345.html"
        actual_url = spider.start_urls[0]

        if actual_url == expected_url:
            print(f"✓ URL构建正确: {actual_url}")
        else:
            print(f"✗ URL构建错误: 期望 {expected_url}, 实际 {actual_url}")
            return False

        # 测试自定义设置
        if hasattr(spider, 'custom_settings'):
            print("✓ 自定义设置配置正确")
        else:
            print("✗ 缺少自定义设置配置")
            return False

        return True

    except Exception as e:
        print(f"✗ 快速功能测试失败: {e}")
        return False


def main():
    """主测试函数"""
    print("角色搜索功能测试")
    print("=" * 40)

    # 运行所有测试
    tests = [
        test_spider_initialization,
        test_pipeline,
        test_settings,
        run_quick_test,
    ]

    passed = 0
    total = len(tests)

    for test in tests:
        if test():
            passed += 1

    print(f"\n=== 测试总结 ===")
    print(f"通过: {passed}/{total}")

    if passed == total:
        print("🎉 所有测试通过！角色搜索功能已准备就绪。")
        print("\n使用方法:")
        print("  python main.py 白凝冰")
        print("  python demo.py 白凝冰")
        print("  python character_search.py --character '白凝冰'")
    else:
        print("❌ 部分测试失败，请检查配置。")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
