import os
import pickle
import random


if os.path.exists('state.dat'):
    # Restore the previously saved state
    print('Found state.dat, initializing random module')
    with open('state.dat', 'rb') as f:
        state = pickle.load(f)
    random.setstate(state)
else:
    # 使用一个初始状态
    print('No state.dat, seeding')
    random.seed(1)

# 生成随机数
for i in range(3):
    print(f'{random.random():04.3f}', end=' ')
print()

# 为下次使用保存状态
with open('state.dat', 'wb') as f:
    pickle.dump(random.getstate(), f)

# 生成更多的随机数
print('\nAfter saving state:')
for i in range(3):
    print(f'{random.random():04.3f}', end=' ')
print()
