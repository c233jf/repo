/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>

using std::cout;

template <typename T>
class SmartPointer {
 private:
  T* ptr_;

 public:
  explicit SmartPointer(T* ptr) : ptr_(ptr) {}
  ~SmartPointer() {
    delete ptr_;
    // 由于后续没有任何地方使用 ptr_，所以这里不需要将 ptr_ 置为 nullptr。
  }

  T* operator->() const { return ptr_; }
  T& operator*() const { return *ptr_; }
};

class Person {
 private:
  int age_;

 public:
  explicit Person(int age) : age_(age) { cout << "Person()" << '\n'; }
  ~Person() { cout << "~Person()" << '\n'; }

  void ShowAge() const { cout << "Age: " << age_ << '\n'; }
};

int main() {
  SmartPointer<Person> ptr(new Person(10));
  ptr->ShowAge();
  (*ptr).ShowAge();

  return 0;
}
