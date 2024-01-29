/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>
#include <memory>

using std::cout;
using std::shared_ptr;
using std::weak_ptr;

class Person;

class Car {
 public:
  //  这里使用 weak_ptr。
  weak_ptr<Person> person_;

  ~Car() { cout << "~Car()" << '\n'; }
};

class Person {
 public:
  //  或者这里使用 weak_ptr，又或者两者都使用，都能解决循环引用的问题。
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
