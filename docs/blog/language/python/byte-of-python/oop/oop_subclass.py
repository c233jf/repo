class SchoolMember:
    """代表学校里的成员。"""

    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        print("Initialized SchoolMember: {}".format(self.name))

    def tell(self):
        """告诉我有关我的细节。"""
        print("Name: {}, Age: {}".format(self.name, self.age), end=" ")


class Teacher(SchoolMember):
    """代表一位老师。"""

    def __init__(self, name: str, age: int, salary: int):
        SchoolMember.__init__(self, name, age)
        self.salary = salary
        print("Initialized Teacher: {}".format(self.name))

    def tell(self):
        SchoolMember.tell(self)
        print("Salary: {:d}".format(self.salary))


class Student(SchoolMember):
    """代表一位学生。"""

    def __init__(self, name: str, age: int, marks: int):
        SchoolMember.__init__(self, name, age)
        self.marks = marks
        print("Initialized Student: {}".format(self.name))

    def tell(self):
        SchoolMember.tell(self)
        print("Marks: {:d}".format(self.marks))


t = Teacher("Mrs. Shrividya", 40, 30000)
s = Student("Swaroop", 25, 75)

print()

members: list[SchoolMember] = [t, s]
for member in members:
    member.tell()
