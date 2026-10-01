/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>

using std::cout;

void Test1() {
  // #region first
  int a = 10;
  double b = a;
  cout << a << '\n';  // 10
  cout << b << '\n';  // 10

  double c = reinterpret_cast<double&>(a);
  cout << c << '\n';  // 随机值
  // #endregion first
}

void Test2() {
  // #region second
  class Person {
   public:
    virtual ~Person() {}
  };

  class Student : public Person {};

  class Car {};

  Person* p1 = new Person();
  Person* p2 = new Student();
  Student* s1 = reinterpret_cast<Student*>(p1);
  Student* s2 = reinterpret_cast<Student*>(p2);
  Car* c1 = reinterpret_cast<Car*>(p1);
  // #endregion second
}

void Test3() {
  // #region third
  int* p1 = reinterpret_cast<int*>(0x12345678);
  int a = reinterpret_cast<int>(p1);
  // #endregion third
}

int main() {
  // Test1();
  return 0;
}
