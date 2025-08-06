#!/usr/bin/env python3
"""
角色搜索工具

使用方法:
python character_search.py --character "白凝冰" --book-id "38127"
python character_search.py --character "方源" --book-id "38127"
"""

import argparse
import subprocess
import sys
from pathlib import Path


def run_character_search(character_name: str, book_id: str, output_format: str = "console"):
    """
    运行角色搜索爬虫

    Args:
        character_name: 要搜索的角色名称
        book_id: 小说ID
        output_format: 输出格式 (console / json / csv)
    """
    # 构建 scrapy 命令
    cmd = [
        "uv", "run", "scrapy", "crawl", "character",
        "-a", f"character_name={character_name}",
        "-a", f"book_id={book_id}"
    ]

    # 根据输出格式添加参数
    if output_format == "json":
        output_file = f"character_{character_name}_{book_id}.json"
        cmd.extend(["-o", output_file, "-t", "json"])
        print(f"结果将保存到: {output_file}")
    elif output_format == "csv":
        output_file = f"character_{character_name}_{book_id}.csv"
        cmd.extend(["-o", output_file, "-t", "csv"])
        print(f"结果将保存到: {output_file}")

    print(f"开始搜索角色 '{character_name}' 在小说 {book_id} 中的出现...")
    print(f"执行命令: {' '.join(cmd)}")
    print("=" * 60)

    try:
        # 运行scrapy爬虫
        subprocess.run(
            cmd, capture_output=False, text=True, check=True)
        print("\n" + "=" * 60)
        print("搜索完成！")

    except subprocess.CalledProcessError as e:
        print(f"搜索失败: {e}")
        print("请确保:")
        print("1. 已安装 scrapy: uv sync")
        print("2. 在正确的目录中运行此脚本")
        print("3. 网络连接正常")
        sys.exit(1)
    except FileNotFoundError:
        print("错误: 未找到 scrapy 命令")
        print("请安装 scrapy: uv sync")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="搜索指定角色在小说章节中的出现",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  %(prog)s --character "白凝冰" --book-id "38127"
  %(prog)s --character "方源" --book-id "38127"
  %(prog)s --character "白凝冰" --book-id "38127" --output json
  %(prog)s --character "白凝冰" --book-id "38127" --output csv

支持的输出格式:
  console - 控制台输出（默认）
  json    - JSON 文件
  csv     - CSV 文件
        """
    )

    parser.add_argument(
        "--character", "-c",
        required=True,
        help="要搜索的角色名称"
    )

    parser.add_argument(
        "--book-id", "-b",
        required=True,
        help="小说 ID"
    )

    parser.add_argument(
        "--output", "-o",
        choices=["console", "json", "csv"],
        default="console",
        help="输出格式（默认: console）"
    )

    args = parser.parse_args()

    # 检查是否在正确的目录中
    if not Path("character_spider.py").exists():
        print("错误: 请在包含 character_spider.py 的目录中运行此脚本")
        sys.exit(1)

    # 检查是否存在scrapy.cfg
    if not Path("scrapy.cfg").exists():
        print("创建 scrapy 配置文件...")
        create_scrapy_config()

    # 运行搜索
    run_character_search(args.character, args.book_id, args.output)


def create_scrapy_config():
    """创建 scrapy 配置文件"""
    config_content = """[settings]
default = novel_spider.settings

[deploy]
project = novel_spider
"""

    with open("scrapy.cfg", "w", encoding="utf-8") as f:
        f.write(config_content)

    print("已创建 scrapy.cfg 配置文件")


if __name__ == "__main__":
    main()
