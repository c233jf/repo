class Robot:
    """表示有一个带有名字的机器人。"""

    # 一个类变量，用来统计机器人的数量
    population = 0

    def __init__(self, name):
        """初始化数据"""
        self.name = name
        print("Initializing {}".format(self.name))
        # 当机器人被生产出来的时候
        # 机器人人口增加
        Robot.population += 1

    def die(self):
        """啊！我要死掉了。"""
        print("{} is being destroyed!".format(self.name))
        Robot.population -= 1
        if Robot.population == 0:
            print("{} was the last one.".format(self.name))
        else:
            print("There are still {:d} robots working.".format(
                Robot.population))

    def say_hi(self):
        """来自机器人的问候

        是的，他们有这种功能"""
        print("Greetings, my masters call me {}".format(self.name))

    @classmethod
    def how_many(cls):
        """打印当前的人口数量"""
        print("We have {:d} robots.".format(cls.population))


droid1 = Robot("R2-D2")
droid1.say_hi()
Robot.how_many()

droid2 = Robot("C-3PO")
droid2.say_hi()
Robot.how_many()

print("\nRobots can do some work here.\n")

print("Robots have finished their work. So let's destroy them.")

droid1.die()
droid2.die()

Robot.how_many()
