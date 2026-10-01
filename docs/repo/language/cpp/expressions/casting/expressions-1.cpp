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
  Person* p2 = new Student();
  cout << "p1: " << p1 << "\n";
  cout << "p2: " << p2 << "\n";
  // Student* s1 = p1;  // error // [!code error]
  Student* s2 = dynamic_cast<Student*>(p1);  // 不安全的转换，s2 为 nullptr
  Student* s3 = dynamic_cast<Student*>(p2);
  cout << "s2: " << s2 << "\n";  // 00000000
  cout << "s3: " << s3 << "\n";

  Car* c1 = (Car*)p1;                // 不安全的转换，c1 为 p1 的地址
  Car* c2 = dynamic_cast<Car*>(p2);  // 不安全的转换，c2 为 nullptr
  cout << "c1: " << c1 << "\n";
  cout << "c2: " << c2 << "\n";  // 00000000

  return 0;
}
