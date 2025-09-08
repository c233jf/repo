import itertools
import random


FACE_CARDS = ('J', 'Q', 'K', 'A')
SUITS = ('H', 'D', 'C', 'S')


def new_deck():
    return [
        # 值总是用两个值，所以字符串有一致的长度
        '{:>2}{}'.format(*card)
        for card in itertools.product(
            itertools.chain(range(2, 11), FACE_CARDS), SUITS
        )
    ]


def show_deck(deck: list[str]):
    p_deck = deck[:]
    while p_deck:
        row = p_deck[:13]
        p_deck = p_deck[13:]
        for j in row:
            print(j, end=' ')
        print()


# 创建一副有序新牌
deck = new_deck()
print('Initial deck:')
show_deck(deck)

# 随机打乱牌的次序
random.shuffle(deck)
print('\nShuffled deck:')
show_deck(deck)

# Deal 4 hands of 5 cards each
hands = [[], [], [], []]
for i in range(5):
    for hand in hands:
        hand.append(deck.pop())

# 展示手里的牌
print('\nHands:')
for n, h in enumerate(hands):
    print('{}:'.format(n + 1), end=' ')
    for c in h:
        print(c, end=' ')
    print()

# 展示剩下的牌
print('\nRemaining deck:')
show_deck(deck)
