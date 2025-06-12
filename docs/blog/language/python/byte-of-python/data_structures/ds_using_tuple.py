# 尽管圆括号是可选的，
# 我还是建议使用圆括号，
# 来表示元组的开始和结束。
# 因为显式总比隐式要好。
zoo = ('python', 'elephant', 'penguin')
print('Number of animals in the zoo is', len(zoo))

new_zoo = 'monkey', 'camel', zoo  # parentheses not required but are a good idea
print('Number of cages in the new zoo is', len(new_zoo))
print('All animals in new zoo are', new_zoo)
print('Animals brought from old zoo are', new_zoo[2])
print('Last animal brought from old zoo is', new_zoo[2][2])
print('Number of animals in the new zoo is',
      len(new_zoo) - 1 + len(new_zoo[2]))

# 空元组
myempty = ()
print(myempty)
# 输出: ()

# 单个元素的元组需要使用逗号来表示
one = (5,)
print(one)

two = (5, 6)
print(two)

three = 5, 6, 7
print(three)
