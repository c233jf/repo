/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>
#include <memory>

using std::cout;
using std::shared_ptr;

class Person;

class Car {
 public:
  shared_ptr<Person> person_;

  ~Car() { cout << "~Car()" << '\n'; }
};

class Person {
 public:
  shared_ptr<Car> car_;

  ~Person() { cout << "~Person()" << '\n'; }
};

int main() {
  {
    // shared_ptr 循环引用。
    // 两个 new 出来的对象都不会被释放。
    shared_ptr<Person> person(new Person());
    shared_ptr<Car> car(new Car());
    person->car_ = car;
    car->person_ = person;
  }

  return 0;
}
