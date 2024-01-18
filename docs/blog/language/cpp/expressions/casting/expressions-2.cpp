/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>

using std::cout;

class Person {
 public:
  virtual ~Person() {}
};

class Student : public Person {};

class Car {};

int main() {
  Person* p1 = new Person();
  const Person* p2 = static_cast<const Person*>(p1);
  // 等价于
  // const Person* p2 = p1;

  // Car* c1 = static_cast<Car*>(p1);  // error // [!code error]

  int a = 10;
  double b = static_cast<double>(a);
  // 等价于
  // double b = (double)a; double b = a;

  return 0;
}
