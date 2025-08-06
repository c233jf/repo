# 小说角色搜索工具

这是一个基于 Scrapy 框架的小说角色搜索工具，可以搜索指定角色在小说章节中的出现情况。

## 功能特点

- 🔍 **角色搜索**: 搜索指定角色在小说中哪些章节出现
- 📊 **统计分析**: 统计角色在每个章节的出现次数
- 📝 **上下文提取**: 提取角色出现的上下文内容
- 💾 **多种输出**: 支持控制台、JSON、CSV等输出格式
- ⚡ **高效爬取**: 智能延迟和并发控制

## 文件说明

- `character_spider.py` - 核心角色搜索爬虫
- `main.py` - 主程序入口，支持命令行调用
- `character_search.py` - 完整的命令行工具
- `demo.py` - 使用示例和演示脚本
- `quotes_spider.py` - 原有的引用爬虫
- `chapter.html` - 目标网站章节 HTML 结构示例

## 安装依赖

```sh
uv sync
```

## 使用方法

### 1. 简单使用

```sh
# 搜索"白凝冰"角色
uv run main.py 白凝冰 38127

# 搜索指定小说中的角色
uv run main.py 方源 38127
```

### 2. 使用演示脚本

```sh
# 运行演示
uv run demo.py demo

# 简单搜索示例
uv run demo.py simple

# 搜索特定角色
uv run demo.py 白凝冰
```

### 3. 使用完整的命令行工具

```sh
# 基本搜索
uv run character_search.py --character "白凝冰" --book-id "38127"

# 指定小说ID
uv run character_search.py --character "方源" --book-id "38127"

# 输出到JSON文件
uv run character_search.py --character "白凝冰" --book-id "38127" --output json

# 输出到CSV文件
uv run character_search.py --character "白凝冰" --book-id "38127" --output csv
```

### 4. 在 Python 代码中使用

```python
from character_spider import CharacterSpider
from scrapy.crawler import CrawlerProcess

# 配置爬虫设置
settings = {
    'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'ROBOTSTXT_OBEY': False,
    'DOWNLOAD_DELAY': 1,
    'CONCURRENT_REQUESTS': 1,
}

# 创建爬虫进程
process = CrawlerProcess(settings)

# 启动搜索
process.crawl(CharacterSpider, character_name="白凝冰", book_id="38127")
process.start()
```

## 输出示例

```sh
=== 发现角色 '白凝冰' ===
小说: 蛊真人
章节: 第十三节：月下竹林，一点珠雪
出现次数: 3
章节链接: https://www.dxmwx.org/read/38127_8939559.html
上下文片段:
  1. ...方源看向白凝冰，心中暗想这丫头还是挺聪明的...
  2. ...白凝冰轻咬嘴唇，眼中闪过一丝担忧...
  3. ...看着白凝冰的背影，方源心中五味杂陈...
------------------------------------------------------------

=== 搜索完成 ===
角色 '白凝冰' 共在 15 个章节中出现
总出现次数: 47

章节列表:
  1. 第十三节：月下竹林，一点珠雪 (出现3次)
  2. 第二十节：学堂家老无语了 (出现2次)
  3. 第二十五节：春光正明媚 (出现4次)
  ...
```

## 配置说明

### 爬虫设置

可以通过修改 settings 配置爬虫行为：

```python
settings = {
    'USER_AGENT': 'Mozilla/5.0 ...',  # 用户代理
    'ROBOTSTXT_OBEY': False,           # 是否遵守robots.txt
    'DOWNLOAD_DELAY': 1,               # 下载延迟（秒）
    'RANDOMIZE_DOWNLOAD_DELAY': True,  # 随机化延迟
    'CONCURRENT_REQUESTS': 1,          # 并发请求数
    'RETRY_TIMES': 3,                  # 重试次数
    'LOG_LEVEL': 'INFO',              # 日志级别
}
```

### 搜索参数

- `character_name`: 要搜索的角色名称
- `book_id`: 小说的ID（例如 38127，对应《蛊真人》）

## 网站结构说明

目标网站的章节页面结构：

- 章节目录页: `https://www.dxmwx.org/chapter/{book_id}.html`
- 章节内容页: `https://www.dxmwx.org/read/{book_id}_{chapter_id}.html`

## 注意事项

1. **遵守网站规则**: 请适当设置延迟，避免对目标网站造成过大压力
2. **网络连接**: 确保网络连接稳定
3. **内容变化**: 网站结构可能会变化，需要相应调整选择器
4. **字符编码**: 确保正确处理中文字符

## 扩展功能

可以在此基础上扩展更多功能：

- 角色关系分析
- 情感分析
- 角色出现频率趋势
- 多角色共现分析
- 导出更详细的统计报告

## 故障排除

### 常见问题

1. **ImportError**: 确保已安装 scrapy
2. **网络错误**: 检查网络连接，可能需要设置代理
3. **选择器失效**: 网站结构可能已变化，需要更新 CSS 选择器
4. **编码问题**: 确保文件编码为 UTF-8

### 调试方法

```sh
# 启用详细日志
export SCRAPY_SETTINGS_MODULE=myproject.settings
uv run scrapy crawl character -a character_name="白凝冰" -L DEBUG
```

## 许可证

本项目仅供学习和研究使用，请遵守相关法律法规和网站使用条款。
