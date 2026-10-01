import pickle


class Node:
    """一个简单的有向图"""

    def __init__(self, name: str):
        self.name = name
        self.connections: list[Node] = []

    def add_edge(self, node: "Node"):
        """在这个节点和其他节点间建立一条边"""

        self.connections.append(node)

    def __iter__(self):
        return iter(self.connections)


def preorder_traversal(root: Node, seen: set[Node] = None, parent: Node = None):
    """给一个图生成边的生成器函数"""

    if seen is None:
        seen = set()
    yield (parent, root)
    if root in seen:
        return
    seen.add(root)
    for node in root:
        recurse = preorder_traversal(node, seen, root)
        for parent, subnode in recurse:
            yield (parent, subnode)


def show_edges(g: Node):
    """打印一个图中的所有边"""

    for parent, child in preorder_traversal(g):
        if parent is not None:
            print(f'{parent.name:>5} -> {child.name:>2} ({id(child)})')


# 创建有向图
root = Node('root')
a = Node('a')
b = Node('b')
c = Node('c')

# 给节点间添加边
root.add_edge(a)
root.add_edge(b)
a.add_edge(b)
b.add_edge(a)
b.add_edge(c)
a.add_edge(a)

print('ORIGINAL GRAPH:')
show_edges(root)

# 序列化和反序列化有向图
# 产生一组新的节点
dumped = pickle.dumps(root)
reloaded = pickle.loads(dumped)

print('\nRELOADED GRAPH:')
show_edges(reloaded)
