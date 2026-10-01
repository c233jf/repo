/**
 * Copyright 2023 <Hardworking Bee>
 */

class Person {
 private:
  int age_;

 public:
  explicit Person(int age) : age_(age) {}
  ~Person() {}

  Person& operator=(const Person& p) {
    age_ = p.age_;
    return *this;
  }
};

class Student : public Person {
 private:
  int score_;

 public:
  Student(int age, int score) : Person(age), score_(score) {}
  ~Student() {}

  Student& operator=(const Student& s) {
    Person::operator=(s);
    score_ = s.score_;
    return *this;
  }
};

int main() {
  Student s1{18, 100};
  Student s2{20, 90};
  s1 = s2;

  return 0;
}
