/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>
#include <memory>

using std::cout;

class Person {
 private:
  int age_;

 public:
  Person() {}
  explicit Person(int age) : age_(age) { cout << "Person()" << '\n'; }
  ~Person() { cout << "~Person()" << '\n'; }

  void ShowAge() const { cout << "Age: " << age_ << '\n'; }
};

void Test1() {
  // #region shared_ptr
  std::shared_ptr<Person> ptr(new Person(10));
  ptr->ShowAge();
  (*ptr).ShowAge();

  // 数组用法
  std::shared_ptr<Person[]> ptr2(new Person[10]);  // 通常使用这个
  std::shared_ptr<Person> ptr3(new Person[10], [](Person* p) { delete[] p; });

  // 分配给多个所有者
  std::shared_ptr<Person> ptr4 = ptr;
  std::shared_ptr<Person> ptr5(ptr);

  // 引用计数
  cout << ptr.use_count() << '\n';  // 3
  // #endregion shared_ptr
}

void Test2() {
  // #region unique_ptr
  std::unique_ptr<Person> ptr(new Person(10));
  ptr->ShowAge();
  (*ptr).ShowAge();

  // 数组用法
  std::unique_ptr<Person[]> ptr2(new Person[10]);

  // 转移所有权
  std::unique_ptr<Person> ptr3 = std::move(ptr);
  // #endregion unique_ptr
}

int main() {
  Test1();

  return 0;
}
